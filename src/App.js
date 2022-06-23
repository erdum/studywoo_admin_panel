import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// UI Components and hooks
import { useTheme } from "@chakra-ui/react";

// Helper Functions
import getScreenDim from "./helpers/getScreenDim";

// Custom Components
import Sidebar from "./components/Sidebar";
import AuthProvider from "./components/AuthProvider";

// App State Context
import useStateContext from "./contexts/StateContextProvider";

// Menu Items
import MenuLinks from "./Menu-Items.js";

const hideLoader = () => {
	const loader = document.getElementById("loader");

	if (loader) {
		loader.style.setProperty("opacity", "0");
		setTimeout(() => loader.remove(), 200);
	}
};

const App = () => {
	const [isMenuOpen, setMenu] = useState(false);
	const { width } = getScreenDim();
	const theme = useTheme();
	const { userData } = useStateContext();
	const navigate = useNavigate();

	const handleHeaderAction = () => {
		navigate("/account-settings");
	};

	const handleHomeAction = () => {
		navigate("/");
	};

	useEffect(() => {
		// Adding event listeners to static App Shell
		const btn = document.querySelector("#header_action > i");
		const headerAction = document.querySelector("#header_action");
		const homeLink = document.querySelector("header > h1");

		homeLink.addEventListener("click", handleHomeAction);
		hideLoader();

		if (width >= theme.breakpoints.lg) {
			headerAction?.addEventListener("click", handleHeaderAction);
			setMenu(true);
		} else {
			btn?.addEventListener("click", () => setMenu(true));
		}

		return () => {
			btn?.removeEventListener("click", () => setMenu(false));
			headerAction?.removeEventListener("click", handleHeaderAction);
			homeLink.removeEventListener("click", handleHomeAction);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!userData) return;
		const userAvatar = document.querySelector("#header_action img");
		const userName = document.querySelector("#header_action p");

		userAvatar.setAttribute(
			"src",
			`${process.env.REACT_APP_IMG_URL}${userData.avatar}.webp`
		);
		userName.textContent = userData.name;
	}, [userData]);

	return (
		<AuthProvider>
			<Sidebar
				isOpen={isMenuOpen}
				links={MenuLinks}
				outsideClickHandler={() =>
					width >= theme.breakpoints.lg ? null : setMenu(false)
				}
			/>
			<h1>user logged in</h1>
		</AuthProvider>
	);
};

export default App;
