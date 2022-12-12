import { date } from "../helpers/customColumns";

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
        editable: true,
    },
    {
        field: "permissions",
        headerName: "Permissions",
        width: 400,
        editable: true,
    },
    {
        field: "updated_at",
        headerName: "Updated At",
        width: 200,
        ...date,
    }
];

const Roles = () => {
    return (
        <TablePage
            columns={columns}
            resourceLink="managment/roles"
            title="Roles and Permissions"
            description="Manage admins and users roles and permissions"
            btnText="Save"
        />
    );
};

export default Roles;
