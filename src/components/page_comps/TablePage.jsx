import { useState, useCallback } from "react";

// UI Components
import { Box } from "@chakra-ui/react";
import { DataGridPro, useGridApiRef, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Components
import { PageTableSkeleton } from "./PageSkeleton";
import PageHeader from "./PageHeader";
import Alert from "../app_shell/Alert";
import EditToolbar from "./EditToolbar";

// Icons
import { EditIcon, CloseIcon, DeleteIcon, UnlockIcon } from "@chakra-ui/icons";

// Custom Hooks
import syncTableWithServer from "../../helpers/syncTableWithServer";
import filterTableRows from "../../helpers/filterTableRows";

const TablePage = ({
    resourcePath,
    columns,
    title,
    description,
    btnText,
    addRows = false,
}) => {
    const { isFetching, data, deleteRows } = syncTableWithServer(resourcePath);

    const { filteredRows, setSearchValue } = filterTableRows(data);

    const [selectedRows, setSelectedRows] = useState([]);
    const [alertData, setAlert] = useState(false);

    const shouldShowMenu = selectedRows?.length > 0;

    const dataGridTheme = createTheme();
    const apiRef = useGridApiRef();

    const handleBulkActions = useCallback(
        ({ type }) => {
            switch (type) {
                case "edit":
                    setAlert({
                        open: true,
                        yes: () => null,
                        heading: "Edit Rows",
                        body: "Are you sure you want to save the changes on the selected rows?",
                    });
                    break;

                case "delete":
                    setAlert({
                        open: true,
                        yes: () => deleteRows(selectedRows),
                        heading: "Delete Rows",
                        body: "Are you sure you want to delete the selected rows?",
                    });
                    break;

                case "export":
                    break;

                default:
                    break;
            }
        },
        [selectedRows]
    );

    const preventDefault = (params, event) => {
        event.defaultMuiPrevented = true;
    };

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

    const newColumns = [
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            getActions: ({ id }) => {
                const isInEditMode = apiRef.current.getRowMode(id) === "edit";

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<UnlockIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CloseIcon />}
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
            },
        },
        ...columns,
    ];

    return (
        <>
            <PageHeader
                title={title}
                description={description}
                btnText={btnText}
                enableSearch
                disableBtn
                enableMenu={shouldShowMenu}
                onSearch={(value) => setSearchValue(value)}
                onBulkAction={handleBulkActions}
            />
            <Box p={{ lg: "1" }} h="calc(100% - 6rem)" overflowY="auto">
                {isFetching && <PageTableSkeleton />}
                {!isFetching && (
                    <ThemeProvider theme={dataGridTheme}>
                        <DataGridPro
                            editMode="row"
                            onRowEditStart={preventDefault}
                            onRowEditStop={preventDefault}
                            onCellFocusOut={preventDefault}
                            checkboxSelection
                            apiRef={apiRef}
                            columns={newColumns}
                            rows={
                                filteredRows?.length === 0
                                    ? data ?? []
                                    : filteredRows
                            }
                            selectionModel={selectedRows}
                            onSelectionModelChange={(newSelectedRows) =>
                                setSelectedRows(newSelectedRows)
                            }
                            components={{
                                Toolbar: EditToolbar,
                            }}
                            componentsProps={{
                                toolbar: { apiRef },
                            }}
                        />
                    </ThemeProvider>
                )}
            </Box>
            <Alert
                isOpen={alertData.open}
                onClose={() => setAlert(false)}
                onYes={() => alertData.yes()}
                heading={alertData.heading}
                body={alertData.body}
                size={{ base: "xs", md: "md" }}
            />
        </>
    );
};

export default TablePage;
