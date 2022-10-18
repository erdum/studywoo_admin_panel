import {
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon, DeleteIcon, EditIcon, DownloadIcon } from "@chakra-ui/icons";

const BulkActionMenu = () => {
	return (
		<Menu>
			<MenuButton
				size={{ base: "sm", md: "md" }}
				color="white"
				bg="custom.primary"
				boxShadow="base"
				borderWidth="2px"
				borderColor="custom.primary"
				ml={{ lg: "auto" }}
				_hover={{
					boxShadow: "none",
					backgroundColor: "white",
					color: "custom.primary",
				}}
				_active={{
					bg: "white",
					color: "custom.primary",
					outline: "none"
				}}
				as={Button}
				rightIcon={<ChevronDownIcon />}
			>
				Bulk Actions
			</MenuButton>
			<MenuList>
				<MenuItem icon={<EditIcon w="4" h="4" color="gray.500" />}>Edit</MenuItem>
				<MenuItem icon={<DeleteIcon w="4" h="4" color="gray.500" />}>Delete</MenuItem>
				<MenuDivider />
				<MenuItem icon={<DownloadIcon w="4" h="4" color="gray.500" />}>Export</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default BulkActionMenu;
