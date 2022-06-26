import { Flex, Spacer, Text, Button } from "@chakra-ui/react";

import SearchBar from "./SearchBar";

const PageHeader = ({ title, description, btnText }) => {
	return (
		<Flex
			w="100%"
			minH="16"
			pt={{ base: "2", md: "0" }}
			align="center"
			justify="space-between"
			wrap={{ base: "wrap", lg: "nowrap" }}
			gap={{ base: "4" }}
		>
			<Flex direction="column" align="start">
				<Text
					noOfLines={1}
					fontWeight="bold"
					color="custom.primary"
					fontSize={{ base: "xl", md: "2xl" }}
				>
					{title}
				</Text>
				<Text
					noOfLines={1}
					fontSize={{ base: "xs", md: "sm" }}
					color="gray.500"
					fontWeight="medium"
					pt={{ md: "0.5", lg: "1" }}
				>
					{description}
				</Text>
			</Flex>
			<Button
				size={{ base: "sm", md: "md" }}
				w={{ md: "20" }}
				color="white"
				bg="custom.primary"
				boxShadow="base"
				ml={{ lg: "auto" }}
				_hover={{
					boxShadow: "none",
					backgroundColor: "white",
					color: "custom.primary",
					borderWidth: "2px",
					borderColor: "custom.primary",
				}}
			>
				{btnText}
			</Button>
			<SearchBar />
		</Flex>
	);
};

export default PageHeader;
