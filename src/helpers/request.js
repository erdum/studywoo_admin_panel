import storage from "./storage";

const request = async (url, showToast, options) => {
	try {

		let headers = {
			"Authorization": `Bearer ${storage.getItem("accessToken")}`,
		};

		if (options && typeof options?.body === "object") {
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
		if (error.message === "Failed to fetch") {
			showToast({
				title: "No Network",
				description: "Network error! check your Internet connection",
			});
		} else if (error.message === "Request failed") {
			showToast({
				title: "Request Failed",
				description: "Request failed from the server !",
			});
		} else {
			console.log("Error after request sent", error);
		}
	}
};

export default request;
