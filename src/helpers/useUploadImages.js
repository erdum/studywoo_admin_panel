import request from "./request";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const useUploadImages = (path) => {
    const { showAppToast } = useStateContext();
    return async (payload) =>
        request(path, showAppToast, {
            body: payload,
            method: "POST",
        });
};

export default useUploadImages;
