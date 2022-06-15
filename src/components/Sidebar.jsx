import { Box, Flex, Avatar, Text, Slide } from "@chakra-ui/react";

const Sidebar = ({ isOpen }) => {
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
				borderRight={{ base: "none", lg: "1px"}}
				borderTop={{ base: "none", lg: "1px"}}
				borderColor={{ lg: "gray.300"}}
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
			</Box>
		</Slide>
	);
};

export default Sidebar;
