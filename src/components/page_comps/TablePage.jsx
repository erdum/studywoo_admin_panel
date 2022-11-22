import { useState, useCallback } from "react";

// UI Components
import { Box } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Components
import { PageTableSkeleton } from "./PageSkeleton";
import PageHeader from "./PageHeader";

// Custom Hooks
import syncTableWithServer from "../../helpers/syncTableWithServer";
import filterTableRows from "../../helpers/filterTableRows";

const TablePage = ({ resourcePath, columns, title, description, btnText }) => {
    const { isFetching, data, deleteRows } = syncTableWithServer(resourcePath);

    const { filteredRows, setSearchValue } = filterTableRows(data);

    const [selectedRows, setSelectedRows] = useState([]);

    const shouldShowMenu = selectedRows?.length > 0;

    const dataGridTheme = createTheme();

    const handleBulkActions = useCallback(
        ({ type }) => {
            switch (type) {
                case "edit":
                    break;

                case "delete":
                    deleteRows(selectedRows);
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
        </>
    );
};

export default TablePage;
