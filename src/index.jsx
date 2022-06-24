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
		gray: {
			50: "#f9fafb",
			100: "#f3f4f6",
			200: "#e5e7eb",
			300: "#d1d5db",
			400: "#9ca3af",
			500: "#6b7280",
			600: "#4b5563",
			700: "#374151",
			800: "#1f2937",
			900: "#111827"
		}
	},
	breakpoints: {
		lg: "992"
	}
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
