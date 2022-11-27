// Third party hooks
import { useQuery, useMutation, useQueryClient } from "react-query";

// Custom hooks
import request from "./request";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const syncTableWithServer = (resourcePath) => {
    const queryClient = useQueryClient();
    const { showAppToast } = useStateContext();

    const { data, isFetching } = useQuery(
        resourcePath,
        async ({ queryKey }) => request(queryKey, showAppToast),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            initialData: [],
        }
    );

    const { mutate: deleteRows } = useMutation(
        async (rows) =>
            request(resourcePath, showAppToast, {
                body: { rows },
                method: "DELETE",
            }),
        {
            onMutate: async (payload) => {
                await queryClient.cancelQueries({
                    queryKey: resourcePath,
                });

                const prevPayload = queryClient.getQueryData(resourcePath);

                queryClient.setQueryData(resourcePath, (prevPayload) =>
                    prevPayload.filter(({ id }) => !payload.includes(id))
                );

                return { prevPayload };
            },
            onError: (err, newPayload, { prevPayload }) => {
                queryClient.setQueryData(resourcePath, prevPayload);
            },
        }
    );

    const { mutate: updateRow } = useMutation(
        async (payload) =>
            request(resourcePath, showAppToast, {
                body: payload,
                method: "PUT",
            }),
        {
            onMutate: async (payload) => {
                await queryClient.cancelQueries({
                    queryKey: resourcePath,
                });

                const prevPayload = queryClient.getQueryData(resourcePath);
                queryClient.setQueryData(resourcePath, (prevData) =>
                    prevData.map((row) => {
                        const rowNeedsToUpdate = payload.rows[0];
                        if (rowNeedsToUpdate === row.id) {
                            const newRow = payload;
                            delete newRow.rows;
                            return {
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
                queryClient.setQueryData(resourcePath, prevPayload);
            },
        }
    );

    return {
        isFetching,
        data,
        deleteRows,
        updateRow,
    };
};

export default syncTableWithServer;
