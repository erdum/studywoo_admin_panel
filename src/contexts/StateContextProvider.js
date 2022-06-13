import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const [isMenuOpen, setMenu] = useState(false);

	const openMenu = () => setMenu(true);

	const closeMenu = () => setMenu(false);

	const value = {
		isMenuOpen,
		openMenu,
		closeMenu
	};

	return (
		<StateContext.Provider value={value}>
			{children}
		</StateContext.Provider>
	);
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;