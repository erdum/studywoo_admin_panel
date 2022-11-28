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

const Roles = () => (
    <TablePage
        columns={columns}
        resourcePath="managment/roles"
        title="Roles and Permissions"
        description="Manage admins and users roles and permissions"
        btnText="Save"
    />
);

export default Roles;
