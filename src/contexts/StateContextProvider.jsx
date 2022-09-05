import { createContext, useContext, useState } from "react";
import storage from "../helpers/storage";
import fetchImage from "../helpers/fetchImage";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const [isDrawerOpen, setDrawer] = useState(false);
	const [userData, setUserData] = useState(storage.getItem("userData"));
	const [appToast, setAppError] = useState(false);

	const changeUserAvatar = async (newAvatar) => {
		if (newAvatar) {
			fetchImage(newAvatar, (cachedAvatar) => {
				setUserData((prevState) => ({ ...prevState, avatar: cachedAvatar }));
				storage.updateItem("userData", (prevItem) => ({
					...prevItem,
					avatar: cachedAvatar,
				}));
			});
		}
	};

	const openDrawer = () => setDrawer(true);

	const closeDrawer = () => setDrawer(false);

	const setUser = async ({ name, email, avatar }) => {
		if (avatar) {
			fetchImage(avatar, (cachedAvatar) => {
				storage.setItem("userData", { name, email, avatar: cachedAvatar });
				setUserData({ name, email, avatar: cachedAvatar });
			});
		} else {
			storage.setItem("userData", { name, email, avatar: null });
			setUserData({ name, email, avatar: null });
		}
	};

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
		changeUserAvatar,
	};

	return (
		<StateContext.Provider value={value}>{children}</StateContext.Provider>
	);
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
