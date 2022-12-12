// Custom Components
import TablePage from "../components/page_comps/TablePage";

// Table Columns Definition
const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 140,
        editable: true,
    },
    {
        field: "roles",
        headerName: "Role",
        width: 400,
        type: "singleSelect",
        valueOptons: ["test", "fasd"],
        editable: true,
    },
    {
        field: "permissions",
        headerName: "Permissions",
        width: 400,
        editable: true,
    },
];

const Subpages = () => (
    <TablePage
        columns={columns}
        resourceLink="managment/subpages"
        title="Colleges Sub Pages"
        description="Manage sub pages for all the colleges"
        btnText="Save"
    />
);

export default Subpages;
