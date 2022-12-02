// Custom Components
import TablePage from "../components/page_comps/TablePage";

// Table Columns Defination
const columns = [
    {
        field: "id",
        headerName: "Application ID",
        width: 100,
    },
    {
        field: "full_name",
        headerName: "Applicant Name",
        width: 400,
        editable: true,
    },
    {
        field: "mobile_number",
        headerName: "Applicant Phone",
        width: 200,
        editable: true,
    },
    {
        field: "email",
        headerName: "Applicant Email",
        width: 400,
        editable: true,
    },
    {
        field: "college_name",
        headerName: "Applied College",
        width: 400,
        editable: true,
    },
    {
        field: "course_name",
        headerName: "Applied Course",
        width: 450,
        editable: true,
    },
    {
        field: "created_at",
        headerName: "Applied Date",
        width: 100,
        type: "date",
        editable: true,
    },
];

const Home = () => (
    <TablePage
        columns={columns}
        resourcePath="managment/applications"
        title="Applications"
        description="All the applications for college admissions"
        btnText="Save"
        addingRowsEnable
    />
);

export default Home;
