import { useState } from "react";
import { getToken } from "../helpers/authToken";
import Login from "./Login";

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuth] = useState(getToken());

	const submitAuth = (username, password) => {
		
	};

	if (!isAuthenticated) return <Login submit={submitAuth} />;

	return {children};
};

export default AuthProvider;
