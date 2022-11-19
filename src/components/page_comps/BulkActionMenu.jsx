import {
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Box,
} from "@chakra-ui/react";
import {
	ChevronDownIcon,
	DeleteIcon,
	EditIcon,
	DownloadIcon,
} from "@chakra-ui/icons";

const BulkActionMenu = ({ onAction }) => {
	return (
		<Box zIndex="10" ml={{ lg: "auto" }}>
			<Menu>
				<MenuButton
					size={{ base: "sm", md: "md" }}
					color="white"
					bg="custom.primary"
					boxShadow="base"
					borderWidth="2px"
					borderColor="custom.primary"
					_hover={{
						boxShadow: "none",
						backgroundColor: "white",
						color: "custom.primary",
					}}
					_active={{
						bg: "white",
						color: "custom.primary",
						outline: "none",
					}}
					_focusVisible={{
						outline: "none",
					}}
					as={Button}
					rightIcon={<ChevronDownIcon />}
				>
					Bulk Actions
				</MenuButton>
				<MenuList>
					<MenuItem
						onClick={() => onAction({ type: "edit" })}
						icon={<EditIcon w="4" h="4" color="gray.500" />}
					>
						Edit
					</MenuItem>
					<MenuItem
						onClick={() => onAction({ type: "delete" })}
						color="red.500"
						icon={<DeleteIcon w="4" h="4" color="red.500" />}
					>
						Delete
					</MenuItem>
					<MenuDivider />
					<MenuItem
						onClick={() => onAction({ type: "export" })}
						icon={<DownloadIcon w="4" h="4" color="gray.500" />}
					>
						Export
					</MenuItem>
				</MenuList>
			</Menu>
		</Box>
	);
};

export default BulkActionMenu;
