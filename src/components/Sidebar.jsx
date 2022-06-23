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
	useTheme,
	useOutsideClick,
} from "@chakra-ui/react";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const Sidebar = ({ links }) => {
	const { width } = getScreenDim();
	const theme = useTheme();
	const {
		userData: { avatar, name },
	} = useStateContext();
	const activeStyle = {
		color: "white",
		backgroundColor: theme.colors.custom.primary,
	};

	useEffect(() => {
		const main = document.querySelector("main");
		if (width >= 992) main.classList.add("ml-64");

		return () => {
			main.classList.remove("ml-64");
		};
	});

	return (
		<Box
			w="16rem"
			h="100%"
			mt={{ base: "0", lg: "4rem" }}
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
				<Avatar src={`${process.env.REACT_APP_IMG_URL}${avatar}.webp`} />
				<Text px="4" fontSize="lg" color="gray.500" fontWeight="semibold">
					{name}
				</Text>
			</Flex>
			<VStack
				align="stretch"
				pt="10"
				spacing="2"
				color="gray.600"
				fontWeight="medium"
				fontSize="lg"
			>
				{links.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						style={({ isActive }) =>
							isActive ? activeStyle : null
						}
						className={`hover:bg-[${theme.colors.custom.primary}] hover:text-white transition-colors`}
					>
						<Flex align="center" px="8" py="2" className={"text-gray-500 font-medium"}>
							<Icon boxSize="1.2rem" as={item.icon} />
							<Text pl="4">{item.label}</Text>
						</Flex>
					</NavLink>
				))}
			</VStack>
		</Box>
	);
};

const SidebarWrapper = ({ isOpen, links, outsideClickHandler }) => {
	const ref = useRef();
	useOutsideClick({
		ref,
		handler: outsideClickHandler,
	});

	return (
		<Slide
			direction="left"
			in={isOpen}
			style={{ width: "auto" }}
			unmountOnExit
		>
			<Sidebar links={links} />
		</Slide>
	);
};

export default SidebarWrapper;
