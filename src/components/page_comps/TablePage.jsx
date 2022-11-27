import { useState, useCallback, useMemo } from "react";

// UI Components
import { Box } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
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
    resourcePath,
    columns,
    title,
    description,
    btnText,
    addRows = false,
}) => {
    const { isFetching, data, deleteRows, updateRow } =
        syncTableWithServer(resourcePath);

    const { filteredRows, setSearchValue } = filterTableRows(data);

    const [selectedRows, setSelectedRows] = useState([]);

    const [selectedCellParams, setSelectedCellParams] = useState(null);
    const [cellModesModel, setCellModesModel] = useState({});

    const [alertData, setAlert] = useState(false);

    const shouldShowMenu = selectedRows?.length > 0;

    const dataGridTheme = createTheme();

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

    const handleCellFocus = useCallback((event) => {
        const row = event.currentTarget.parentElement;
        const id = row.dataset.id;
        const field = event.currentTarget.dataset.field;
        setSelectedCellParams({ id, field });
    }, []);

    const cellMode = useMemo(() => {
        if (!selectedCellParams) return "view";

        const { id, field } = selectedCellParams;
        return cellModesModel[id]?.[field]?.mode || "view";
    }, [cellModesModel, selectedCellParams]);

    const handleCellKeyDown = useCallback(
        (params, event) => {
            if (cellMode === "edit") event.defaultMuiPrevented = true;
        },
        [cellMode]
    );

    const handleUpdateRow = async (row) => {
        const newRow = { ...row };
        delete newRow.id;
        newRow["rows"] = [row.id];
        await updateRow(newRow);
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
                            cellModesModel={cellModesModel}
                            onCellModesModelChange={(model) =>
                                setCellModesModel(model)
                            }
                            components={{
                                Toolbar: TableToolbar,
                            }}
                            componentsProps={{
                                toolbar: {
                                    cellMode,
                                    selectedCellParams,
                                    setSelectedCellParams,
                                    cellModesModel,
                                    setCellModesModel,
                                },
                                cell: {
                                    onFocus: handleCellFocus,
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
