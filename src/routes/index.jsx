import AccountSettings from "../pages/AccountSettings";
import Home from "../pages/Home";

const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/profile-settings",
		element: <AccountSettings />,
	},
];

export default routes;
