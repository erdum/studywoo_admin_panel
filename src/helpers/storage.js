const storage = (() => {
	const getItem = (key) => {
		if (!localStorage.getItem(key)) return null;
		return JSON.parse(localStorage.getItem(key));
	};

	const setItem = (key, data) => {
		if (!key || !data) throw new Error("Key or Data cannot be null");
		localStorage.setItem(key, JSON.stringify(data));
	};

	const clear = (...keys) => {
		keys.forEach((key) => localStorage.removeItem(key));
	};

	return {
		getItem,
		setItem,
		clear
	};
})();

export default storage;
