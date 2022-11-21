// Custom Components
import TablePage from "../components/page_comps/TablePage";

// Table Columns Definition
const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 160,
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
        width: 500,
    },
    {
        field: "roles",
        headerName: "User Roles",
        width: 250,
    },
    {
        field: "status",
        headerName: "User Status",
        width: 250,
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
