import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Helper functions
import getScreenDim from "../helpers/getScreenDim";

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

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const Sidebar = ({ links }) => {
	const { width } = getScreenDim();
	const theme = useTheme();
	const {
		userData: { avatar, name },
		logout
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
				<Avatar
					src={`${import.meta.env.VITE_APP_IMG_URL}${avatar}.webp`}
				/>
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
				h="100%"
				align="stretch"
				pt="10"
				spacing="2"
				fontWeight="medium"
				fontSize="lg"
				className={"text-gray-500 font-semibold"}
			>
				{links.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						style={({ isActive }) =>
							isActive ? activeStyle : null
						}
						className={
							"hover:bg-gray-100 transition-colors font-semibold"
						}
					>
						<Flex align="center" px="8" py="2">
							<Icon boxSize="1.2rem" as={item.icon} />
							<Text pl="4">{item.label}</Text>
						</Flex>
					</NavLink>
				))}
				<Button
					mt="auto"
					variant="ghost"
					px="8"
					display="flex"
					justifyContent="space-between"
					borderRadius="none"
					rightIcon={<Icon as={FaSignOutAlt} />}
					onClick={() => logout()}
					_hover={{
						bg: "gray.100"
					}}
				>
					Logout
				</Button>
			</VStack>
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
			direction="left"
			in={isOpen}
			style={{
				width: "auto",
				top: width >= theme.breakpoints.lg ? "4rem" : "0",
			}}
			unmountOnExit
		>
			<Sidebar links={links} />
		</Slide>
	);
};

export default SidebarWrapper;
