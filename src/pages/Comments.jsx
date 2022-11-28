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
        width: 400,
    },
    {
        field: "posted_on",
        headerName: "Posted On",
        width: 400,
    },
    {
        field: "body",
        headerName: "Comment",
        width: 400,
    },
    {
        field: "approved",
        headerName: "Approved",
        width: 140,
    },
];

const Comments = () => (
    <TablePage
        columns={columns}
        resourcePath="managment/comments"
        title="Comments"
        description="Public comments on blog posts and sub-pages"
        btnText="Save"
    />
);

export default Comments;
