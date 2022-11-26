import { useState, useCallback } from "react";

// UI Components
import { Box } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Components
import { PageTableSkeleton } from "./PageSkeleton";
import PageHeader from "./PageHeader";
import Alert from "../app_shell/Alert";

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
                            checkboxSelection
                            columns={columns}
                            rows={
                                filteredRows?.length === 0
                                    ? data ?? []
                                    : filteredRows
                            }
                            selectionModel={selectedRows}
                            onSelectionModelChange={(newSelectedRows) =>
                                setSelectedRows(newSelectedRows)
                            }
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
