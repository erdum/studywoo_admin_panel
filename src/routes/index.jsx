import AccountSettings from "../pages/AccountSettings";
import Home from "../pages/Home";
import Users from "../pages/Users";

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
];

export default routes;
