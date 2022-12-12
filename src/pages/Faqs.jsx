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
        field: "posted_on",
        headerName: "Posted On",
        width: 300,
    },
    {
        field: "question",
        headerName: "Question",
        width: 400,
    },
    {
        field: "answer",
        headerName: "Answer",
        width: 400,
    },
];

const Faqs = () => (
    <TablePage
        columns={columns}
        resourceLink="managment/faqs"
        title="Comments"
        description="Public comments on blog posts and sub-pages"
        btnText="Save"
    />
);

export default Faqs;
