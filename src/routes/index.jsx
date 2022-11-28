import AccountSettings from "../pages/AccountSettings";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Roles from "../pages/Roles";

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
];

export default routes;
