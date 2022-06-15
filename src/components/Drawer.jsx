import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Input,
} from "@chakra-ui/react";
import useStateContext from "../contexts/StateContextProvider";

const MyDrawer = () => {
	const { isDrawerOpen, closeDrawer } = useStateContext();

	return (
		<Drawer
			isOpen={isDrawerOpen}
			placement="left"
			onClose={closeDrawer}
			closeOnEsc
			closeOnOverlayClick
			blockScrollOnMount
			returnFocusOnClose
		>
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

export default MyDrawer;
