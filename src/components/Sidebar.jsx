import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Input,
} from "@chakra-ui/react";
import useStateContext from "../contexts/StateContextProvider";

const Sidebar = () => {
	const { isDrawerOpen, closeDrawer } = useStateContext();

	return (
		<Drawer
			isOpen={isDrawerOpen}
			placement="left"
			onClose={closeDrawer}
			closeOnEsc
			closeOnOverlayClick
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Create your account</DrawerHeader>

				<DrawerBody>
					<Input placeholder="Type here..." />
				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={closeDrawer}>
						Cancel
					</Button>
					<Button colorScheme="blue">Save</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default Sidebar;
