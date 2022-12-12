// Third party hooks
import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

// Helper functions
import request from "./request";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const syncFieldsWithServer = (resourceLink, initialData) => {
    const { showAppToast } = useStateContext();
    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery(
        resourceLink,
        async ({ queryKey }) => request(queryKey, showAppToast),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            initialData,
        }
    );

    const [localFields, setLocalFields] = useState(data);

    useEffect(() => setLocalFields((prevState) => ({
        ...prevState,
        ...data,
        modified: false,
    })), [data]);

    const updateField = (newStateObject) => {
        setLocalFields((prevState) => ({
            ...prevState,
            ...newStateObject,
            modified: true,
        }));
    };

    const { isLoading: isFieldsUploading, mutate: syncFields } = useMutation(
        async (payload) =>
            request(resourceLink, showAppToast, {
                method: "PUT",
                body: payload,
            }),
        {
            onMutate: async (payload) => {
                await queryClient.cancelQueries({
                    queryKey: resourceLink,
                });

                const prevPayload = queryClient.getQueryData(resourceLink);
                queryClient.setQueryData(resourceLink, (prevData) => ({
                    ...prevData,
                    ...payload,
                }));

                return { prevPayload };
            },
            onSuccess: () => {
                setLocalFields((prevState) => ({
                    ...prevState,
                    modified: false,
                }));
            },
            onError: (err, newPayload, { prevPayload }) => {
                queryClient.setQueryData(resourceLink, prevPayload);
            },
        }
    );

    // if (fields.avatar && typeof fields.avatar === "object") {
    //     const avatar = new FormData();
    //     const extension = fields.avatar.name.split(".").at(-1);
    //     avatar.append("images", fields.avatar, `${fields.email}.${extension}`);
    //     updateImage({ url: "pilot_upload", image: avatar });
    // }

    return {
        isFieldsUploading,
        isFetching,
        localFields,
        updateField,
        syncFields,
    };
};

export default syncFieldsWithServer;
