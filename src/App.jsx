import { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// UI Components and hooks
import { useTheme, useToast } from "@chakra-ui/react";

// Helper Functions
import getScreenDim from "./helpers/getScreenDim";

// Custom Components
import Sidebar from "./components/Sidebar";
import AuthProvider from "./components/AuthProvider";
import HeaderAction from "./components/HeaderAction";
import HomeLink from "./components/HomeLink";
import MobileMenuBtn from "./components/MobileMenuBtn";
import MountPortalComp from "./components/MountPortalComp";
import PageWrapper from "./components/PageWrapper";

// Menu Items
import MenuLinks from "./Menu-Items.js";

// Application Routes
import routes from "./routes";

const hideLoader = () => {
	const loader = document.getElementById("loader");

	if (loader) {
		setTimeout(() => loader.style.setProperty("opacity", "0"), 200);
		setTimeout(() => loader.remove(), 500);
	}
};

// App State Context
import useStateContext from "./contexts/StateContextProvider";

// Toast settings
import { toastSettings } from "./setting";

const App = () => {
	const [isAppMounted, setAppMounted] = useState(false);
	const [isMenuOpen, setMenu] = useState(false);
	const { width } = getScreenDim();
	const theme = useTheme();
	const navigate = useNavigate();
	const Routes = useRoutes(routes);
	const toast = useToast();
	const { appToast } = useStateContext();

	const handleHeaderAction = () => {
		navigate("/profile-settings");
	};

	const handleMobileMenuBtn = () => {
		setMenu(true);
	};

	useEffect(() => {
		hideLoader();
		setAppMounted(true);
		if (width >= theme.breakpoints.lg) setMenu(true);
	}, []);

	useEffect(() => {
		if (!appToast) return;
		const id = "error";

		if (!toast.isActive(id)) {
			toast({
				...toastSettings,
				id,
				status: appToast?.status ?? "error",
				...appToast
			});
		}
	}, [appToast]);

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
			<PageWrapper mount={isAppMounted}>{Routes}</PageWrapper>
		</AuthProvider>
	);
};

export default App;
