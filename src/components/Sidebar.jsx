import { NavLink } from "react-router-dom";

// UI Components
import { Box, Flex, Avatar, Text, Slide, VStack, Icon, useTheme } from "@chakra-ui/react";

import { FaCoffee } from "react-icons/fa";
const navLinks = [
	{
		path: "/test",
		label: "Test",
		icon:  FaCoffee,
	},
	{
		path: "/work",
		label: "Work",
		icon: "",
	},
];

const Sidebar = ({ isOpen }) => {
	const theme = useTheme();

	const activeStyle = {
		color: "white",
		backgroundColor: theme.colors.custom.primary
	};

	return (
		<Slide direction="left" in={isOpen}>
			<Box
				position="fixed"
				left="0"
				top={{ base: "0", lg: "4rem" }}
				bg="white"
				w={{ base: "80%", md: "60%", lg: "16rem" }}
				h="100vh"
				overflow="hidden"
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
					<Avatar src="" />
					<Text
						px="4"
						fontSize="xl"
						color="gray.500"
						fontWeight="medium"
					>
						Erdum
					</Text>
				</Flex>
				<VStack align="stretch" pt="10" spacing="2" color="gray.600" fontWeight="medium" fontSize="lg">
				{navLinks.map(item =>
					<NavLink key={item.path} to={item.path} style={({ isActive }) => isActive ? activeStyle : null}>
						<Flex className={"transition-colors"} align="center" px="8" py="2" _hover={{ color: "white", bg: "custom.primary" }}>
							<Icon boxSize="1.2rem" as={item.icon} />
							<Text pl="4">{item.label}</Text>
						</Flex>
					</NavLink>
				)}
				</VStack>
			</Box>
		</Slide>
	);
};

export default Sidebar;
