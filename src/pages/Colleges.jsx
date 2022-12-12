// Custom Components
import TablePage from "../components/page_comps/TablePage";

// Table Columns Defination
const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 160,
    },
    {
        field: "posted_by",
        headerName: "Posted By",
        width: 300,
    },
    {
        field: "posted_on",
        headerName: "Posted On",
        width: 300,
    },
    {
        field: "body",
        headerName: "Review",
        width: 400,
    },
    {
        field: "rating",
        headerName: "Rating",
        width: 400,
    },
    {
        field: "approved",
        headerName: "Approved",
        width: 140,
        type: "boolean",
    },
];

const Colleges = () => (
    <TablePage
        columns={columns}
        resourceLink="managment/colleges"
        title="Colleges"
        description="Manage all the colleges on the website"
        btnText="Save"
    />
);

export default Colleges;
