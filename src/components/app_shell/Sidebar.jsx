import { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Helper functions
import getScreenDim from "../../helpers/getScreenDim";

// UI Components and Hooks
import {
	Box,
	Flex,
	Avatar,
	Text,
	Slide,
	VStack,
	Icon,
	Button,
	useTheme,
	useOutsideClick,
} from "@chakra-ui/react";

// Icons
import { FaSignOutAlt } from "react-icons/fa";

// Custom UI Component
import Alert from "./Alert";
import SearchBar from "../page_comps/SearchBar";
import SearchModal from "./SearchModal";

// App State Context
import useStateContext from "../../contexts/StateContextProvider";

const Sidebar = ({ links }) => {
	const [isAlertOpen, setAlert] = useState(false);
	const [isAppSearchOpen, setAppSearch] = useState(false);
	const { width } = getScreenDim();
	const theme = useTheme();
	const {
		userData: { avatar, name },
		logout,
	} = useStateContext();

	const activeStyle = {
		color: "white",
		backgroundColor: theme.colors.custom.primary,
	};

	useEffect(() => {
		const main = document.querySelector("main");
		if (width >= theme.breakpoints.lg) main.classList.add("ml-64");

		return () => {
			main.classList.remove("ml-64");
		};
	});

	return (
		<Box
			w="16rem"
			h="100%"
			bg="white"
			boxShadow={{
				base: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
				lg: "base",
			}}
			borderRight={{ base: "none", lg: "1px" }}
			borderTop={{ base: "none", lg: "1px" }}
			borderColor={{ lg: "gray.300" }}
		>
			<Flex
				align="center"
				h="16"
				px="4"
				display={{ base: "flex", lg: "none" }}
				borderBottom="1px"
				borderColor="gray.200"
			>
				<Avatar src={avatar} />
				<Text
					noOfLines={2}
					px="4"
					fontSize="lg"
					color="gray.500"
					fontWeight="semibold"
				>
					{name}
				</Text>
			</Flex>
			<VStack
				h={{ base: "calc(100% - 4rem)", lg: "100%" }}
				align="stretch"
				pt="10"
				pb="4"
				spacing="2"
				fontWeight="medium"
				fontSize="lg"
				className={"text-gray-500 font-semibold"}
			>
				<Box px="4">
					<SearchBar
						onClick={() => setAppSearch(true)}
						boxShadow="base"
						border="none"
						_hover={{ cursor: "pointer", boxShadow: "sm" }}
						onFocus={({ currentTarget }) => currentTarget.blur()}
					/>
				</Box>
				{links.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
						className={"hover:bg-gray-100 transition-colors font-semibold"}
						end
					>
						<Flex align="center" px="8" py="2">
							<Icon boxSize="1.2rem" as={item.icon} />
							<Text pl="4">{item.label}</Text>
						</Flex>
					</NavLink>
				))}
				<Button
					variant="ghost"
					px="8"
					display="flex"
					justifyContent="space-between"
					borderRadius="none"
					rightIcon={<Icon as={FaSignOutAlt} />}
					onClick={() => setAlert(true)}
					_hover={{
						bg: "gray.100",
					}}
					mt="auto !important"
				>
					Logout
				</Button>
			</VStack>
			<Alert
				isOpen={isAlertOpen}
				onClose={() => setAlert(false)}
				onYes={() => logout()}
				heading="Logout"
				body="Are you sure you want to logout?"
				size={{ base: "xs", md: "md" }}
			/>
			<SearchModal
				isOpen={isAppSearchOpen}
				onClose={() => setAppSearch(false)}
			/>
		</Box>
	);
};

const SidebarWrapper = ({ isOpen, links, outsideClickHandler }) => {
	const { width } = getScreenDim();
	const theme = useTheme();
	const ref = useRef();
	useOutsideClick({
		ref,
		handler: outsideClickHandler,
	});

	return (
		<Slide
			ref={ref}
			direction="left"
			in={isOpen}
			style={{
				width: "auto",
				top: width >= theme.breakpoints.lg ? "4rem" : "0",
				zIndex: "10",
			}}
			unmountOnExit
		>
			<Sidebar links={links} />
		</Slide>
	);
};

export default SidebarWrapper;
