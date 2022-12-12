import { useState, useMemo } from "react";

// UI Components
import { Box } from "@chakra-ui/react";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Components
import { PageTableSkeleton } from "./PageSkeleton";
import PageHeader from "./PageHeader";
import Alert from "../app_shell/Alert";
import TableToolbar from "./TableToolbar";

// Icons
import { EditIcon, CloseIcon, DeleteIcon, UnlockIcon } from "@chakra-ui/icons";

// Custom Hooks
import syncTableWithServer from "../../helpers/syncTableWithServer";
import filterTableRows from "../../helpers/filterTableRows";

const TablePage = ({
    resourceLink,
    columns,
    title,
    description,
    btnText,
    addingRowsEnable = false,
}) => {
    const {
        isFetching,
        data,
        deleteRows,
        updateRow,
        addRow,
        addRowInCache,
        removeRowFromCache,
    } = syncTableWithServer(resourceLink);

    const { filteredRows, setSearchValue } = filterTableRows(data);

    const [selectedRows, setSelectedRows] = useState([]);

    const [selectedRowParams, setSelectedRowParams] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});

    const [alertData, setAlert] = useState(false);

    const shouldShowMenu = selectedRows?.length > 0;

    const dataGridTheme = createTheme();

    const handleBulkActions = ({ type }) => {
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
    };

    const handleCellFocus = (event) => {
        const row = event.currentTarget.parentElement;
        const id = row.dataset.id;
        setSelectedRowParams((prevData) =>
            prevData?.id == id ? prevData : { id }
        );
    };

    const rowMode = useMemo(() => {
        if (!selectedRowParams) return "view";

        const { id } = selectedRowParams;
        return rowModesModel[id]?.mode || "view";
    }, [rowModesModel, selectedRowParams]);

    const handleCellKeyDown = (params, event) => {
        if (rowMode === "edit") event.defaultMuiPrevented = true;
    };

    const handleNewRow = () => {
        const id = 9999;
        addRowInCache({ id });
        setRowModesModel({
            ...rowModesModel,
            [id]: {
                mode: GridRowModes.Edit,
            },
        });
        setSelectedRowParams({ id, isNew: true });
    };

    const handleSaveOrEdit = () => {
        if (!selectedRowParams) {
            return;
        }
        const { id } = selectedRowParams;
        if (rowMode === "edit") {
            setRowModesModel({
                ...rowModesModel,
                [id]: {
                    ...rowModesModel[id],
                    mode: GridRowModes.View,
                },
            });
        } else {
            setRowModesModel({
                ...rowModesModel,
                [id]: {
                    ...rowModesModel[id],
                    mode: GridRowModes.Edit,
                },
            });
        }
    };

    const handleCancel = () => {
        if (!selectedRowParams) {
            return;
        }
        const { id, isNew } = selectedRowParams;

        setRowModesModel({
            ...rowModesModel,
            [id]: {
                ...rowModesModel[id],
                mode: GridRowModes.View,
                ignoreModifications: true,
            },
        });

        if (isNew) {
            setSelectedRowParams(null);
            removeRowFromCache(id);
        }
    };

    const handleDelete = async () => {
        const { id } = selectedRowParams;
        await deleteRows([Number(rowId)]);
    };

    const handleUpdateRow = async (row) => {
        if (selectedRowParams?.isNew) {
            await addRow(row);
            return row;
        }

        const newRow = { ...row };
        delete newRow.id;
        newRow["rows"] = [row.id];
        await updateRow(newRow);
        return row;
    };

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
                        <DataGrid
                            editMode="row"
                            experimentalFeatures={{ newEditingApi: true }}
                            columns={columns}
                            rows={
                                filteredRows?.length === 0
                                    ? data ?? []
                                    : filteredRows
                            }
                            processRowUpdate={handleUpdateRow}
                            onProcessRowUpdateError={() => null}
                            onCellKeyDown={handleCellKeyDown}
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={(model) =>
                                setRowModesModel(model)
                            }
                            components={{
                                Toolbar: TableToolbar,
                            }}
                            componentsProps={{
                                toolbar: {
                                    selectedRowParams,
                                    addingRowsEnable,
                                    rowMode,
                                    handleNewRow,
                                    handleSaveOrEdit,
                                    handleCancel,
                                    handleDelete,
                                },
                                cell: {
                                    onFocus: handleCellFocus,
                                },
                            }}
                            sx={{
                                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus":
                                    {
                                        outline: "none !important",
                                    },
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
