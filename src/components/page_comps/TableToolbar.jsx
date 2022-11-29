import { Box, Button } from "@mui/material";

const TableToolbar = ({
    selectedRowParams,
    addingRowsEnable,
    rowMode,
    handleNewRow,
    handleSaveOrEdit,
    handleCancel,
    handleDelete,
}) => {

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 1,
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
            }}
        >
            {addingRowsEnable && (
                <Button
                    sx={{
                        mr: "auto",
                    }}
                    onClick={handleNewRow}
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
