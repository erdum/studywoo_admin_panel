import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// UI Components
// import {  } from "@chakra-ui/react";

// Helper Functions
import getScreenDim from "./helpers/getScreenDim";

// Custom Components
import Sidebar from "./components/Sidebar";

// App State Context
// import useStateContext from "./contexts/StateContextProvider";

// Menu Items
import MenuLinks from "./Menu-Items.js";

const hideLoader = () => {
	const loader = document.getElementById("loader");

	if (loader) {
		loader.style.setProperty("opacity", "0");
		setTimeout(() => loader.remove(), 2000);
	}
};

const App = () => {
	const [isMenuOpen, setMenu] = useState(false);
	const { width } = getScreenDim();

	useEffect(() => {
		const btn = document.querySelector("#header_action > i");
		setTimeout(hideLoader, 1000);

		if (width >= 992) {
			setMenu(true);
		} else {
			btn?.addEventListener("click", () => setMenu(true));
		}

		return () => {
			btn?.removeEventListener("click", () => setMenu(false));
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<Sidebar
				isOpen={isMenuOpen}
				links={MenuLinks}
				outsideClickHandler={() => (width >= 992 ? null : setMenu(false))}
			/>
		</BrowserRouter>
	);
};

export default App;
