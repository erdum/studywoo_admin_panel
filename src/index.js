import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import { StateContextProvider } from "./contexts/StateContextProvider";

const container = document.getElementById("root");
const root = createRoot(container);

const queryClient = new QueryClient();

const theme = extendTheme({
	colors: {
		custom: {
			primary: "#ff9f1c",
			contrast: "#2a9d8f",
		},
	},
});

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<StateContextProvider>
				<ChakraProvider theme={theme}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ChakraProvider>
			</StateContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
