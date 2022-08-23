import { createContext, useContext, useState, useEffect } from "react";
import storage from "../helpers/storage";
import fetchImage from "../helpers/fetchImage";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const [isDrawerOpen, setDrawer] = useState(false);
	const [userData, setUserData] = useState(storage.getItem("userData"));
	const [appToast, setAppError] = useState(false);
	const [userAvatar, setUserAvatar] = useState(null);

	useEffect(() => console.log(userData), [userData]);

	useEffect(() => {
		(async () => {
			const avatar = await fetchImage(userData?.avatar);
			avatar ? setUserAvatar(avatar) : null;
		})()
	}, [userData?.avatar]);

	const changeUserAvatar = (newAvatar) =>
		newAvatar
			? setUserData((prevState) => ({ ...prevState, avatar: newAvatar }))
			: null;

	const openDrawer = () => setDrawer(true);

	const closeDrawer = () => setDrawer(false);

	const setUser = ({ name, email, password, avatar }) =>
		setUserData({ name, email, password, avatar });

	const logout = () => {
		storage.clear("userData", "accessToken");
		location.reload();
	};

	const showAppToast = (error) => (error ? setAppError(error) : null);

	const value = {
		isDrawerOpen,
		openDrawer,
		closeDrawer,
		userData,
		setUser,
		logout,
		appToast,
		showAppToast,
		userAvatar,
		changeUserAvatar,
	};

	return (
		<StateContext.Provider value={value}>{children}</StateContext.Provider>
	);
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
