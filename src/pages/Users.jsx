import getOptions from "../helpers/getOptions";
import { singleSelect } from "../helpers/customColumns";

// Custom Components
import TablePage from "../components/page_comps/TablePage";

const Users = () => {
    const { options: rolesOptions } = getOptions("managment/roles", "roles");

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
            ...singleSelect,
            valueOptions: rolesOptions,
        },
        {
            field: "status",
            headerName: "User Status",
            width: 110,
            editable: true,
            type: "boolean",
        },
    ];

    return (
        <TablePage
            columns={columns}
            resourcePath="managment/users"
            title="Users"
            description="Manage system admins and users"
            btnText="Save"
            addingRowsEnable
        />
    );
};

export default Users;
