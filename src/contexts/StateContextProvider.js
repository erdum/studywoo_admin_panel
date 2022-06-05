import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

	const value = {};

	return (
		<StateContext.Provider value={value}>
			{children}
		</StateContext.Provider>
	);
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;