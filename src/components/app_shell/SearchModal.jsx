import { Modal, ModalOverlay, ModalBody } from "@chakra-ui";

// App State Context
import useStateContext from "../../contexts/StateContextProvider";

const SearchModal = () => {
	const { isAppSearchOpen } = useStateContext();

	return (
		<Modal isOpen={isAppSearchOpen}>
			<ModalOverlay>
				<ModalBody>Testing</ModalBody>
			</ModalOverlay>
		</Modal>
	);
};

export default SearchModal;
