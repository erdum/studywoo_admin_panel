// Custom Components
import TablePage from "../components/page_comps/TablePage";

// Table Columns Definition
const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 140,
    },
    {
        field: "name",
        headerName: "Name",
        width: 400,
    },
    {
        field: "email",
        headerName: "Email",
        width: 400,
    },
    {
        field: "password",
        headerName: "Password",
        width: 400,
    },
    {
        field: "roles",
        headerName: "User Roles",
        width: 200,
    },
    {
        field: "status",
        headerName: "User Status",
        width: 110,
        type: "boolean",
    },
];

const Users = () => (
    <TablePage
        columns={columns}
        resourcePath="managment/users"
        title="Users"
        description="Manage system admins and users"
        btnText="Save"
    />
);

export default Users;
