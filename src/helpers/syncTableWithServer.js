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

    return {
        isFetching,
        data,
        deleteRows,
    };
};

export default syncTableWithServer;
