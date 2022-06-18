const setToken = (token) => {
	sessionStorage.setItem("studywoo-admin-panel-v2.0-token", token);
};

const getToken = () => {
	return sessionStorage.getItem("studywoo-admin-panel-v2.0-token");
};

export {
	setToken,
	getToken,
};
