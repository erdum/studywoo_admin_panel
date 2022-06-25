import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useRoutes } from "react-router-dom";

// UI Components and hooks
import { useTheme, Box } from "@chakra-ui/react";

// Helper Functions
import getScreenDim from "./helpers/getScreenDim";

// Custom Components
import Sidebar from "./components/Sidebar";
import AuthProvider from "./components/AuthProvider";
import HeaderAction from "./components/HeaderAction";
import HomeLink from "./components/HomeLink";
import MobileMenuBtn from "./components/MobileMenuBtn";
import MountPortalComp from "./components/MountPortalComp";

// App State Context
import useStateContext from "./contexts/StateContextProvider";

// Menu Items
import MenuLinks from "./Menu-Items.js";

// Application Routes
import routes from "./routes";

const hideLoader = () => {
	const loader = document.getElementById("loader");

	if (loader) {
		setTimeout(() => loader.style.setProperty("opacity", "0"), 400);
		setTimeout(() => loader.remove(), 1000);
	}
};

const App = () => {
	const [isMenuOpen, setMenu] = useState(false);
	const { width } = getScreenDim();
	const theme = useTheme();
	const { userData } = useStateContext();
	const navigate = useNavigate();
	const Routes = useRoutes(routes);

	const handleHeaderAction = () => {
		navigate("/account-settings");
	};

	const handleMobileMenuBtn = () => {
		setMenu(true);
	};

	useEffect(() => {
		hideLoader();
		if (width >= theme.breakpoints.lg) setMenu(true);
	}, []);

	return (
		<AuthProvider>
			{width >= theme.breakpoints.lg ? (
				<MountPortalComp
					node={document.getElementById("header_action_wrapper")}
				>
					<HeaderAction onClick={handleHeaderAction} />
				</MountPortalComp>
			) : (
				<MountPortalComp
					node={document.querySelector(
						"#header_action_wrapper > div"
					)}
				>
					<MobileMenuBtn onClick={handleMobileMenuBtn} />
				</MountPortalComp>
			)}
			<MountPortalComp
				node={document.getElementById("home_link_wrapper")}
			>
				<HomeLink to="/">Studywoo</HomeLink>
			</MountPortalComp>
			<Sidebar
				isOpen={isMenuOpen}
				links={MenuLinks}
				outsideClickHandler={() =>
					width >= theme.breakpoints.lg ? null : setMenu(false)
				}
			/>
			<Box w="100%" h="100%" bg="white" borderRadius="2xl">
				{Routes}
			</Box>
		</AuthProvider>
	);
};

export default App;
