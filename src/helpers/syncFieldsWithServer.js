// Third party hooks
import { useState, useMemo, useEffect } from "react";
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

    const [localFields, setLocalFields] = useState(data);

    useEffect(() => setLocalFields(data), [data]);

    const updateField = (fieldName, value) => {
        setLocalFields((prevState) => ({
            ...prevState,
            modified: true,
            [fieldName]: value,
        }));
    };

    const { isLoading: isFieldsUploading, mutate: syncFields } = useMutation(
        async (payload) =>
            request(resourcePath, showAppToast, {
                method: "PUT",
                body: payload,
            }),
        {
            onMutate: (payload) => {},
            onSuccess: () => {
                setLocalFields((prevState) => ({
                    ...prevState,
                    modified: false,
                }));
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
