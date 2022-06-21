import { useState } from "react";
import { getToken } from "../helpers/authToken";
import Login from "./Login";

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuth] = useState(getToken());

	const authenticateUser =  async (userName, userPass, error, startLoading, stopLoading) => {
		if (userName === "Erdum") {
			if (userPass === "1234") {
				startLoading();
				setAuth(true);
			} else {
				error({ pass: true });
			}
		} else {
			error({ pass: true, username: true });
		}
	};

	if (!isAuthenticated) return <Login authenticateUser={authenticateUser} />;

	return <>{children}</>;
};

export default AuthProvider;
