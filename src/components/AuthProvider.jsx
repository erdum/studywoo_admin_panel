const AuthProvider = ({ children }) => {
	const isAuthenticated = false;

	if (!isAuthenticated) return <h1>Login Page </h1>;

	return {children};
};

export default AuthProvider;
