const filterRows = (rows, searchValue) => {
	return rows?.filter((row) => {
		const values = Object.values(row);
		return values.find((value) => {
			const word = String(value);
			return word.includes(searchValue);
		});
	}) ?? [];
};

export default filterRows;
