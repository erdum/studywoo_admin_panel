import storage from "./storage";

const request = async (url, contentType = "application/json", options) => {
	const req = await fetch(`${import.meta.env.VITE_APP_API_URL}${url}`, {
		headers: {
			"Content-Type": contentType,
			Authorization: `Bearer ${storage.getItem("accessToken")}`,
		},
		...options,
	});

	if (req.status !== 200) {
		throw new Error("Request failed", { cause: req.status });
	}
	try {
		const data = await req.json();
		return data ?? null;
	} catch {
		return null;
	}
};

export default request;
