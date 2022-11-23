// Third party hooks
import { useQuery, useMutation } from "react-query";

// Helper functions
import request from "./request";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const syncFieldsWithServer = (resourcePath, initialData) => {
    const { showAppToast } = useStateContext();

    const { data, isFetching } = useQuery(
        resourcePath,
        async ({ queryKey }) => request(queryKey, showAppToast),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            initialData,
        }
    );

    const { isLoading: isFieldsUploading, mutate: updateFields } = useMutation(
        async (payload) =>
            request(resourcePath, showAppToast, {
                method: "PUT",
                body: payload,
            }),
        {
            onMutate: (payload) => {},
            onSuccess: () => {
                changeUserAvatar(fields.avatar);
                setFields((prevState) => ({ ...prevState, changed: false }));
            },
        }
    );

    return {
        isFieldsUploading,
        isFetching,
        data,
        updateFields,
    };
};

export default syncFieldsWithServer;
