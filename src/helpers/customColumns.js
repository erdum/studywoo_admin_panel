const singleSelect = {
    type: "singleSelect",
    valuGetter: ({ field, row }) => (row[field] ?? ''),
};

const multiSelect = {};

const richText = {};

const file = {};

const date = {
    type: "date",
    valueFormatter: ({ value }) => {
        if (!value) return '';

        const date = new Date(value);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
};

export {
    singleSelect,
    multiSelect,
    richText,
    file,
    date,
};
