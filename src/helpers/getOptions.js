import { useQuery } from "react-query";

// Helper functions
import request from "./request";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const getOptions = (resourceLink, columnName) => {
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

    return {
        options: data.map(row => row[columnName]),
        isOptionsLoading: isFetching,
    };
};

export default getOptions;
