const filterRows = (rows, searchValue) => {
	return rows?.filter((row) => {
		const values = Object.values(row);
		return values.find((value) => {
			const word = String(value).toLowerCase();
			return word.includes(searchValue.toLowerCase());
		});
	}) ?? [];
};

export default filterRows;
