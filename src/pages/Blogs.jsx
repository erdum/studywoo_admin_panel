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
        field: "title",
        headerName: "Title",
        width: 300,
    },
    {
        field: "slug",
        headerName: "Slug",
        width: 300,
    },
    {
        field: "meta_description",
        headerName: "Meta Description",
        width: 400,
    },
    {
        field: "body",
        headerName: "Body",
        width: 400,
    },
    {
        field: "cover_image",
        headerName: "Cover Image",
        width: 140,
        type: "image",
    },
    {
        field: "posted_by",
        headerName: "Posted By",
        width: 300,
    },
];

const Blogs = () => (
    <TablePage
        columns={columns}
        resourcePath="managment/blogs"
        title="Blogs"
        description="Manage the Blogs available on the website"
        btnText="Save"
    />
);

export default Blogs;
