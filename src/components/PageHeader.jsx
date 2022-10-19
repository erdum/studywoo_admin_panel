import { Flex, Text, Button } from "@chakra-ui/react";

import SearchBar from "./SearchBar";
import BulkActionMenu from "./BulkActionMenu";

const PageHeader = ({
	title,
	description,
	btnText,
	onBtnClick,
	enableSearch,
	disableBtn,
	isBtnLoading,
	onSearch,
	enableMenu,
}) => {
	return (
		<Flex
			w="100%"
			minH="16"
			pt={{ base: "2", md: "0" }}
			align="center"
			justify="space-between"
			wrap={{ base: "wrap", lg: "nowrap" }}
			gap={{ base: "4" }}
			mb={{ base: "6", md: "8", lg: "10" }}
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
			{enableMenu ? (
				<BulkActionMenu />
			) : (
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
					isDisabled={disableBtn}
					isLoading={isBtnLoading}
					onClick={onBtnClick}
				>
					{btnText}
				</Button>
			)}
			{enableSearch && (
				<SearchBar onChange={() => (onSearch ? onSearch() : () => {})} />
			)}
		</Flex>
	);
};

export default PageHeader;
