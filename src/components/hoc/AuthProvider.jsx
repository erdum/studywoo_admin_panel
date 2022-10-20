// App State Context
import useStateContext from "../contexts/StateContextProvider";

import Login from "./Login";

const AuthProvider = ({ children }) => {
	const { userData } = useStateContext();

	if (!userData) return <Login />;

	return <>{children}</>;
};

export default AuthProvider;
