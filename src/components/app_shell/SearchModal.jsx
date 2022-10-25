import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { InputGroup, InputLeftElement, Input, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onChange }) => {
	return (
		<InputGroup>
			<InputLeftElement
				h="100%"
				pointerEvents="none"
				children={<Icon color="gray.500" fontSize="2xl" as={FaSearch} />}
			/>
			<Input
				focusBorderColor="custom.primary"
				type="search"
				placeholder="search"
				h="16"
				_focusVisible={{
					outline: "none"
				}}
			/>
		</InputGroup>
	);
};

const SearchModal = ({ isOpen, onClose }) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalBody>
					<ModalContent display="flex" alignItems="stretch">
						<SearchBar />
					</ModalContent>
				</ModalBody>
			</ModalOverlay>
		</Modal>
  );
};

export default SearchModal;