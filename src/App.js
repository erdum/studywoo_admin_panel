import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// UI Components
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Helper Functions
import getScreenDim from "./helpers/getScreenDim";

// Custom Components
import Sidebar from "./components/Sidebar";

// App State Context
import useStateContext from "./contexts/StateContextProvider";

const theme = extendTheme({
	colors: {
		custom: {
			primary: "#2a9d8f",
			secondary: "#264653",
			contrast: "#f4a261",
			contrastDark: "#e76f51",
			contrastLight: "#e9c46a",
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

const App = () => {
	const { isMenuOpen, openMenu } = useStateContext();

	useEffect(() => {
		setTimeout(() => {
			const { width } = getScreenDim();
			hideLoader();

			if (width >= 992) {
				openMenu(true);
			}
		}, 1000);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<Sidebar isOpen={isMenuOpen} />
				</BrowserRouter>
			</ChakraProvider>
		</>
	);
};

export default App;
