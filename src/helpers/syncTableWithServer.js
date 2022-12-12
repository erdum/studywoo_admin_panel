// Third party hooks
import { useQuery, useMutation, useQueryClient } from "react-query";

// Custom hooks
import request from "./request";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const syncTableWithServer = (resourceLink) => {
    const queryClient = useQueryClient();
    const { showAppToast } = useStateContext();

    const { data, isFetching } = useQuery(
        resourceLink,
        async ({ queryKey }) => request(queryKey, showAppToast),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            initialData: [],
        }
    );

    const { mutate: deleteRows } = useMutation(
        async (rows) =>
            request(resourceLink, showAppToast, {
                body: { rows },
                method: "DELETE",
            }),
        {
            onMutate: async (payload) => {
                await queryClient.cancelQueries({
                    queryKey: resourceLink,
                });

                const prevPayload = queryClient.getQueryData(resourceLink);

                queryClient.setQueryData(resourceLink, (prevPayload) =>
                    prevPayload.filter(({ id }) => !payload.includes(id))
                );

                return { prevPayload };
            },
            onError: (err, newPayload, { prevPayload }) => {
                queryClient.setQueryData(resourceLink, prevPayload);
            },
        }
    );

    const { mutate: updateRow } = useMutation(
        async (payload) =>
            request(resourceLink, showAppToast, {
                body: payload,
                method: "PUT",
            }),
        {
            onMutate: async (payload) => {
                await queryClient.cancelQueries({
                    queryKey: resourceLink,
                });

                const prevPayload = queryClient.getQueryData(resourceLink);

                queryClient.setQueryData(resourceLink, (prevData) =>
                    prevData.map((row) => {
                        const rowNeedsToUpdate = payload.rows[0];
                        if (rowNeedsToUpdate === row.id) {
                            const newRow = { ...payload };
                            delete newRow.rows;
                            return {
                                ...row,
                                ...newRow,
                            };
                        }

                        return {
                            ...row,
                        };
                    })
                );

                return { prevPayload };
            },
            onError: (err, newPayload, { prevPayload }) => {
                queryClient.setQueryData(resourceLink, prevPayload);
            },
        }
    );

    const { mutate: addRow } = useMutation(
        async (payload) =>
            request(resourceLink, showAppToast, {
                body: payload,
                method: "POST",
            }),
        {
            onMutate: async (payload) => {
                await queryClient.cancelQueries({
                    queryKey: resourceLink,
                });

                const prevPayload = queryClient
                    .getQueryData(resourceLink)
                    .filter(({ id }) => id != payload?.id);

                return { prevPayload };
            },
            onSuccess: () => queryClient.invalidateQueries(resourceLink),
            onError: (err, newPayload, { prevPayload }) => {
                queryClient.setQueryData(resourceLink, prevPayload);
            },
        }
    );

    const addRowInCache = (row) =>
        queryClient.setQueryData(resourceLink, (prevData) => [
            ...prevData,
            row,
        ]);

    const removeRowFromCache = (id) =>
        queryClient.setQueryData(resourceLink, (prevData) =>
            prevData.filter(({ id: rowId }) => rowId != id)
        );

    return {
        isFetching,
        data,
        deleteRows,
        updateRow,
        addRow,
        addRowInCache,
        removeRowFromCache,
    };
};

export default syncTableWithServer;
