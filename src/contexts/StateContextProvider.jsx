import { createContext, useContext, useState } from "react";
import storage from "../helpers/storage";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const [isDrawerOpen, setDrawer] = useState(false);
	const [userData, setUserData] = useState(storage.getItem("userData"));
	const [appToast, setAppError] = useState(false);

	const openDrawer = () => setDrawer(true);

	const closeDrawer = () => setDrawer(false);

	const setUser = ({ name, email, password, avatar }) =>
		setUserData({ name, email, password, avatar });

	const logout = () => {
		storage.clear("userData", "accessToken");
		location.reload();
	};

	const showAppToast = error => error ? setAppError(error) : null;

	const value = {
		isDrawerOpen,
		openDrawer,
		closeDrawer,
		userData,
		setUser,
		logout,
		appToast,
		showAppToast,
	};

	return (
		<StateContext.Provider value={value}>{children}</StateContext.Provider>
	);
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
