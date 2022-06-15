import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import getScreenDim from "./helpers/getScreenDim";
// import useStateContext from "./contexts/StateContextProvider";

const hideLoader = () => {
	const loader = document.getElementById("loader");

	if (loader) {
		loader.style.setProperty("opacity", "0");
		setTimeout(() => loader.remove(), 2000);
	}
};

const App = () => {
	useEffect(() => {
		setTimeout(() => hideLoader(), 3000);
		const { width } = getScreenDim();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<ChakraProvider>
				<BrowserRouter></BrowserRouter>
			</ChakraProvider>
		</>
	);
};

export default App;
