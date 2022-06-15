import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const [isDrawerOpen, setDrawer] = useState(false);

	const openDrawer = () => setDrawer(true);

	const closeDrawer = () => setDrawer(false);

	const value = {
		isDrawerOpen,
		openDrawer,
		closeDrawer,
	};

	return (
		<StateContext.Provider value={value}>{children}</StateContext.Provider>
	);
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
