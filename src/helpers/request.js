import storage from "./storage";

const request = async (url, showToast, options) => {
	try {

		let headers = {
			"Authorization": `Bearer ${storage.getItem("accessToken")}`,
		};

		if (options && options?.body.constructor === Object) {
			headers["Content-Type"] = "application/json";
			options.body = JSON.stringify(options.body);
		}

		const req = await fetch(`${import.meta.env.VITE_APP_API_URL}${url}`, {
			headers,
			...options,
		});

		if (req.status !== 200 && req.status !== 201) {
			throw new Error("Request failed", { cause: req.status });
		} else if (options?.body) {
			showToast({
				title: "Success",
				description: "Opreation successfully executed by the server",
				status: "success",
			});
		}

		const data = await req.json();
		return data ?? null;
	} catch (error) {
		// detecting client side network errors
		if (error instanceof TypeError) {
			showToast({
				title: "No Network",
				description: "Network error! check your Internet connection",
			});
			throw new Error("No network request failed");
		} else {
			showToast({
				title: "Request Failed",
				description: "Request failed from the server !",
			});
			throw new Error("Request failed from server", { cause: req.status });
		}
	}
};

export default request;
