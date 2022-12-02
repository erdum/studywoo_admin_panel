const singleSelect = {
    type: "singleSelect",
    valuGetter: ({ field, row }) => (row[field] ?? ''),
};

const multiSelect = {};

const richText = {};

const file = {};

export {
    singleSelect,
    multiSelect,
    richText,
    file,
};
