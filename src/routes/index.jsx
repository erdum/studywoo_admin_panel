import AccountSettings from "../pages/AccountSettings";
import Home from "../pages/Home";
import Login from "../components/Login";

const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/profile-settings",
		element: <AccountSettings />,
	},
];

export default routes;
