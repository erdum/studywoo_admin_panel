import storage from "./storage";

const request = async (url, options) => {
	return await fetch(`${import.meta.env.VITE_APP_API_URL}${url}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${storage.getItem("accessToken")}`,
		},
		...options,
	});
};

export default request;
