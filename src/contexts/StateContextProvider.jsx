import { createContext, useContext, useState, useReducer } from "react";
import storage from "../helpers/storage";
import fetchImage from "../helpers/fetchImage";

const StateContext = createContext();

const appDefaultState = {
	isDrawerOpen: false,
	userData: storage.getItem("userData"),
	appToast: false,
};

const reducer = (state, action) => {
	switch (action?.type) {
		case "TOGGLE_DRAWER":
			return {
				...state,
				isDrawerOpen: action.payload,
			};
			break;

		case "UPDATE_USER_AVATAR":
			return {
				...state,
				userData: {
					...state.userData,
					avatar: action.payload,
				},
			};
			break;

		case "SET_USER_DATA":
			return {
				...state,
				userData: action.payload,
			};
			break;

		case "SET_ERROR":
			return {
				...state,
				appToast: action.payload,
			};
			break;

		default:
			break;
	}
};

export const StateContextProvider = ({ children }) => {
	const [{ isDrawerOpen, userData, appToast }, dispatcher] = useReducer(
		reducer,
		appDefaultState
	);

	const changeUserAvatar = async (newAvatar) => {
		if (newAvatar) {
			fetchImage(newAvatar, (cachedAvatar) => {
				dispatcher({ type: "UPDATE_USER_AVATAR", payload: cachedAvatar });
				storage.updateItem("userData", (prevItem) => ({
					...prevItem,
					avatar: cachedAvatar,
				}));
			});
		}
	};

	const openDrawer = () => dispatcher({ type: "TOGGLE_DRAWER", payload: true });

	const closeDrawer = () =>
		dispatcher({ type: "TOGGLE_DRAWER", payload: false });

	const setUser = async ({ name, email, avatar }) => {
		if (avatar) {
			fetchImage(avatar, (cachedAvatar) => {
				storage.setItem("userData", { name, email, avatar: cachedAvatar });
				dispatcher({
					type: "SET_USER_DATA",
					payload: { name, email, avatar: cachedAvatar },
				});
			});
		} else {
			storage.setItem("userData", { name, email, avatar: null });
			dispatcher({
				type: "SET_USER_DATA",
				payload: { name, email, avatar: null },
			});
		}
	};

	const logout = () => {
		storage.clear("userData", "accessToken");
		location.reload();
	};

	const showAppToast = (error) =>
		error ? dispatcher({ type: "SET_ERROR", payload: error }) : null;

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
