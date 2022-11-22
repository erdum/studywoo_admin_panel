// Third party hooks
import { useQuery, useMutation } from "react-query";

// Helper functions
import request from "./request";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const syncFieldsWithServer = (resourcePath, initialData) => {
    const {
        showAppToast,
        changeUserAvatar,
        userData: { avatar },
    } = useStateContext();

    const { data, isFetching } = useQuery(
        resourcePath,
        async ({ queryKey }) => request(queryKey, showAppToast),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            initialData,
        }
    );

    const { mutate: updateFields } = useMutation(
        (payload) =>
            request(resourcePath, showAppToast, {
                method: "PUT",
                body: payload,
            }),
        {
            onSuccess: () => {
                changeUserAvatar(fields.avatar);
                setFields((prevState) => ({ ...prevState, changed: false }));
            },
        }
    );

    const { mutate: updateImage } = useMutation((payload) => {
        request(payload.url, showAppToast, {
            method: "POST",
            body: payload.image,
        });
    });

    return {
        isFetching,
        data,
        updateFields,
        updateImage,
    };
};

export default syncFieldsWithServer;
