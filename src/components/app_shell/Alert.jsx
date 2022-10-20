import { useRef } from "react";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure,
} from "@chakra-ui/react";

const Alert = ({ isOpen, onClose, onYes, heading, body, size }) => {
	const cancelRef = useRef();

	return (
		<AlertDialog
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			motionPreset="slideInBottom"
			leastDestructiveRef={cancelRef}
			size={size}
		>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogCloseButton ref={cancelRef} />
				<AlertDialogHeader>{heading}</AlertDialogHeader>
				<AlertDialogBody>{body}</AlertDialogBody>
				<AlertDialogFooter>
					<Button onClick={onYes} colorScheme="red">Yes</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Alert;
