import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

// UI Components
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Helper Functions
import getScreenDim from "./helpers/getScreenDim";

// Custom Components
import Sidebar from "./components/Sidebar";

// App State Context
import useStateContext from "./contexts/StateContextProvider";

// Menu Items
import MenuLinks from "./Menu-Items.js";

const theme = extendTheme({
	colors: {
		custom: {
			primary: "#ff9f1c",
			contrast: "#2a9d8f",
		},
	},
});

const hideLoader = () => {
	const loader = document.getElementById("loader");

	if (loader) {
		loader.style.setProperty("opacity", "0");
		setTimeout(() => loader.remove(), 2000);
	}
};

const queryClient = new QueryClient();

const App = () => {
	const { isMenuOpen, openMenu } = useStateContext();

	useEffect(() => {
		setTimeout(() => {
			const btn = document.querySelector("#header_action > i");
			const { width } = getScreenDim();
			hideLoader();

			if (width >= 992) {
				openMenu();
			} else {
				if (btn) btn.addEventListener("click", () => openMenu());
			}

			return () => {
				if (btn) btn.removeEventListener("click", () => openMenu());
			}
		}, 1000);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<Sidebar isOpen={isMenuOpen} links={MenuLinks} />
				</BrowserRouter>
			</ChakraProvider>
		</QueryClientProvider>
	);
};

export default App;
