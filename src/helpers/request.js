import storage from "./storage";

const request = async (url, options) => {
	const req = await fetch(`${import.meta.env.VITE_APP_API_URL}${url}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${storage.getItem("accessToken")}`,
		},
		...options,
	});

	if (req.status !== 200 && req.status !== 201 && req.status !== 302) {
		throw new Error("Request failed", { cause: req.status });
	}
	return req.json();
};

export default request;
