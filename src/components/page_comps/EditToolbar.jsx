import PropTypes from "prop-types";

import { Button } from "@chakra-ui/react";

// Icons
import { AddIcon } from "@chakra-ui/icons";

import {
    useGridApiRef,
    GridToolbarContainer,
    GridActionsCellItem,
} from "@mui/x-data-grid";

function EditToolbar(props) {
    const { apiRef } = props;

    const handleClick = () => {
        const id = randomId();
        // id should be max + 1 of id column
        apiRef.current.updateRows([{ id, isNew: true }]);
        apiRef.current.setRowMode(id, "edit");
        // Wait for the grid to render with the new row
        setTimeout(() => {
            apiRef.current.scrollToIndexes({
                rowIndex: apiRef.current.getRowsCount() - 1,
            });

            apiRef.current.setCellFocus(id, "name");
        });
    };

    return (
        <GridToolbarContainer>
            <Button style={{ mx: "4"}} leftIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    apiRef: PropTypes.shape({
        current: PropTypes.object.isRequired,
    }).isRequired,
};

export default EditToolbar;
