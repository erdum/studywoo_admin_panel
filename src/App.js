import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// UI Components
// import {  } from "@chakra-ui/react";

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
	const { userData } = useStateContext();

	const handleHeaderAction = () => {};

	useEffect(() => {
		// Adding event listeners to static App Shell
		const btn = document.querySelector("#header_action > i");
		const headerAction = document.querySelector("#header_action");
		hideLoader();

		if (width >= 992) {
			headerAction.addEventListener("click", handleHeaderAction);
			setMenu(true);
		} else {
			btn?.addEventListener("click", () => setMenu(true));
		}

		return () => {
			btn?.removeEventListener("click", () => setMenu(false));
			headerAction?.removeEventListener("click", handleHeaderAction);
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

	// return null;

	return (
		<BrowserRouter>
			<AuthProvider>
				<Sidebar
					isOpen={isMenuOpen}
					links={MenuLinks}
					outsideClickHandler={() =>
						width >= 992 ? null : setMenu(false)
					}
				/>
				<h1>user logged in</h1>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
