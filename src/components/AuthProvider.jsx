import { useState } from "react";
import { getToken } from "../helpers/authToken";
import Login from "./Login";

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuth] = useState(getToken());

	if (!isAuthenticated) return <Login />;

	return {children};
};

export default AuthProvider;
