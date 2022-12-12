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
        field: "name",
        headerName: "Name",
        width: 400,
        editable: true,
    },
    {
        field: "email",
        headerName: "Email",
        width: 400,
        editable: true,
    },
    {
        field: "password",
        headerName: "Password",
        width: 400,
        editable: true,
    },
    {
        field: "roles",
        headerName: "User Roles",
        width: 200,
        editable: true,
    },
    {
        field: "status",
        headerName: "User Status",
        width: 110,
        editable: true,
        type: "boolean",
    },
];

const SiteSettings = () => (
    <TablePage
        columns={columns}
        resourceLink="managment/site-settings"
        title="Site Settings"
        description="Manage all the website settings"
        btnText="Save"
    />
);

export default SiteSettings;
