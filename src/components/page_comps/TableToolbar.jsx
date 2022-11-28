import { Box, Button } from "@mui/material";
import { GridRowModes } from "@mui/x-data-grid";

const TableToolbar = ({
    selectedRowParams,
    rowMode,
    rowModesModel,
    setRowModesModel,
    handleDeleteRow,
    addRows,
}) => {
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
        const { id } = selectedRowParams;
        setRowModesModel({
            ...rowModesModel,
            [id]: {
                ...rowModesModel[id],
                mode: GridRowModes.View,
                ignoreModifications: true,
            },
        });
    };

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    const handleDelete = () => {
        const { id } = selectedRowParams;
        handleDeleteRow(id);
    };

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 1,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            {addRows && (
                <Button
                    sx={{
                        mr: "auto",
                    }}
                    onClick={handleSaveOrEdit}
                    onMouseDown={handleMouseDown}
                    variant="outlined"
                    color="warning"
                    size="small"
                >
                    Add
                </Button>
            )}
            <Button
                onClick={handleSaveOrEdit}
                onMouseDown={handleMouseDown}
                disabled={!selectedRowParams}
                variant="outlined"
                color={rowMode === "edit" ? "success" : "warning"}
                size="small"
            >
                {rowMode === "edit" ? "Save" : "Edit"}
            </Button>
            <Button
                onClick={handleCancel}
                onMouseDown={handleMouseDown}
                disabled={rowMode === "view"}
                variant="outlined"
                color="warning"
                sx={{ ml: 1 }}
                size="small"
            >
                Cancel
            </Button>
            <Button
                onClick={handleDelete}
                onMouseDown={handleMouseDown}
                disabled={!selectedRowParams}
                variant="outlined"
                color="error"
                sx={{ ml: 1 }}
                size="small"
            >
                Delete
            </Button>
        </Box>
    );
};

export default TableToolbar;
