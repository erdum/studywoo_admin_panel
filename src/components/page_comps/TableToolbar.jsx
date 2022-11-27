import { Box, Button } from "@mui/material";
import { GridCellModes } from "@mui/x-data-grid";

const TableToolbar = ({
    selectedCellParams,
    cellMode,
    cellModesModel,
    setCellModesModel,
    handleDeleteRow,
}) => {
    const handleSaveOrEdit = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id, field } = selectedCellParams;
        if (cellMode === "edit") {
            setCellModesModel({
                ...cellModesModel,
                [id]: {
                    ...cellModesModel[id],
                    [field]: { mode: GridCellModes.View },
                },
            });
        } else {
            setCellModesModel({
                ...cellModesModel,
                [id]: {
                    ...cellModesModel[id],
                    [field]: { mode: GridCellModes.Edit },
                },
            });
        }
    };

    const handleCancel = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id, field } = selectedCellParams;
        setCellModesModel({
            ...cellModesModel,
            [id]: {
                ...cellModesModel[id],
                [field]: {
                    mode: GridCellModes.View,
                    ignoreModifications: true,
                },
            },
        });
    };

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    const handleDelete = () => {
        const { id } = selectedCellParams;
        handleDeleteRow(id);
    }

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 1,
            }}
        >
            <Button
                onClick={handleSaveOrEdit}
                onMouseDown={handleMouseDown}
                disabled={!selectedCellParams}
                variant="outlined"
            >
                {cellMode === "edit" ? "Save" : "Edit"}
            </Button>
            <Button
                onClick={handleCancel}
                onMouseDown={handleMouseDown}
                disabled={cellMode === "view"}
                variant="outlined"
                sx={{ ml: 1 }}
            >
                Cancel
            </Button>
            <Button
                onClick={handleDelete}
                onMouseDown={handleMouseDown}
                disabled={!selectedCellParams}
                variant="outlined"
                sx={{ ml: 1 }}
            >
                Delete
            </Button>
        </Box>
    );
};

export default TableToolbar;
