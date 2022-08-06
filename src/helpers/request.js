import storage from "./storage";

const request = async (url, showError, options) => {
	try {
		const req = await fetch(`${import.meta.env.VITE_APP_API_URL}${url}`, {
			headers: {
				Authorization: `Bearer ${storage.getItem("accessToken")}`,
			},
			...options,
		});

		if (req.status !== 200 && req.status !== 201) {
			throw new Error("Request failed", { cause: req.status });
		}

		const data = await req.json();
		return data ?? null;
	} catch (error) {

		// detecting client side network error
		if (error.cause === undefined) {
			showError("Network error! check your Internet connection");
		} else {
			showError("Request failed from the server !");
		}
	}
};

export default request;
