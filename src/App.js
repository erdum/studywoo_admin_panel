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
