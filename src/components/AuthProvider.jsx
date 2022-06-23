// Custom Components
import Login from "./Login";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const AuthProvider = ({ children }) => {
	const { userData } = useStateContext();

	if (!userData) return <Login />;

	return <>{children}</>;
};

export default AuthProvider;
