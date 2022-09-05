const storage = (() => {
	const getItem = (key) => {
		if (!localStorage.getItem(key)) return null;
		return JSON.parse(localStorage.getItem(key));
	};

	const setItem = (key, data) => {
		if (!key || !data) throw new Error("Key or Data cannot be null");
		localStorage.setItem(key, JSON.stringify(data));
	};

	const updateItem = (key, callback) => {
		if (!key) throw new Error("Key cannot be null");

		const prevItem = JSON.parse(localStorage.getItem(key));
		const newItem = callback(prevItem);

		if (!newItem) throw new Error("Callback returned null");
		localStorage.setItem(key, JSON.stringify(newItem));
	};

	const clear = (...keys) => {
		keys.forEach((key) => localStorage.removeItem(key));
	};

	return {
		getItem,
		setItem,
		updateItem,
		clear,
	};
})();

export default storage;
