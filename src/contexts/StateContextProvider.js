import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialValues = {
	drawer: false,
	menu: false,
};

export const StateContextProvider = ({ children }) => {
	const [isDrawerOpen, setDrawer] = useState(initialValues.drawer);
	const [isMenuOpen, setMenu] = useState(initialValues.menu);

	const openDrawer = () => setDrawer(true);

	const closeDrawer = () => setDrawer(false);

	const openMenu = () => setMenu(true);

	const closeMenu = () => setMenu(false);

	const value = {
		isDrawerOpen,
		openDrawer,
		closeDrawer,
		isMenuOpen,
		openMenu,
		closeMenu,
	};

	return (
		<StateContext.Provider value={value}>{children}</StateContext.Provider>
	);
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
