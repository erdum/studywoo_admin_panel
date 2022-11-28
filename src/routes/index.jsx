import AccountSettings from "../pages/AccountSettings";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
import Comments from "../pages/Comments";
import Faqs from "../pages/Faqs";
import Ratings from "../pages/Ratings";
import Blogs from "../pages/Blogs";
import Colleges from "../pages/Colleges";
import Subpages from "../pages/Subpages";
import SiteSettings from "../pages/SiteSettings";

const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/profile-settings",
		element: <AccountSettings />,
	},
    {
        path: "/users",
        element: <Users />,
    },
    {
    	path: "/roles",
    	element: <Roles />,
    },
    {
        path: "/comments",
        element: <Comments />,
    },
    {
        path: "/faqs",
        element: <Faqs />,
    },
    {
        path: "/ratings",
        element: <Ratings />,
    },
    {
        path: "/blogs",
        element: <Blogs />,
    },
    {
        path: "/colleges",
        element: <Colleges />,
    },
    {
        path: "/subpages",
        element: <Subpages />,
    },
    {
        path: "/site-settings",
        element: <SiteSettings />,
    }
];

export default routes;
