import { useState, useDeferredValue, useMemo } from "react";

const filterRows = (rows, searchValue) => {
    return (
        rows?.filter((row) => {
            const values = Object.values(row);
            return values.find((value) => {
                const word = String(value).toLowerCase();
                return word.includes(searchValue.toLowerCase());
            });
        }) ?? []
    );
};

const filterTableRows = (rows) => {
    const [searchValue, setSearchValue] = useState("");
    const searchedText = useDeferredValue(searchValue);
    const filteredRows = useMemo(
        () => filterRows(rows, searchedText),
        [searchedText]
    );

    return {
        filteredRows,
        setSearchValue,
    };
};

export default filterTableRows;
