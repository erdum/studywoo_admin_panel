const editableRow = () => {
    const apiRef = useGridApiRef();

    const preventMuiEvent = (_, event) => (event.defaultMuiPrevented = true);

    const handleEditClick = (id) => (event) => {
        event.stopPropagation();
        apiRef.current.setRowMode(id, "edit");
    };

    const handleSaveClick = (id) => async (event) => {
        event.stopPropagation();
        // Wait for the validation to run
        const isValid = await apiRef.current.commitRowChange(id);
        if (isValid) {
            apiRef.current.setRowMode(id, "view");
            const row = apiRef.current.getRow(id);
            apiRef.current.updateRows([{ ...row, isNew: false }]);
        }
    };

    const handleDeleteClick = (id) => (event) => {
        event.stopPropagation();
        apiRef.current.updateRows([{ id, _action: "delete" }]);
    };

    const handleCancelClick = (id) => (event) => {
        event.stopPropagation();
        apiRef.current.setRowMode(id, "view");

        const row = apiRef.current.getRow(id);
        if (row.isNew) {
            apiRef.current.updateRows([{ id, _action: "delete" }]);
        }
    };

    const tableActions = (id) => {
        const isInEditMode = apiRef.current.getRowMode(id) === "edit";

        if (isInEditMode) {
            return [
                <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                />,
            ];
        }

        return [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
            />,
        ];
    };

    const actionColumn = {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 100,
        getActions: ({ id }) => tableActions(id),
    };
};

export default editableRow;
