import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Input,
	Icon,
	Box,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onChange }) => {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			px={{ base: "4", md: "8" }}
		>
			<Icon
				color="gray.500"
				fontSize={{ base: "xl", md: "2xl" }}
				mr="2"
				as={FaSearch}
			/>
			<Input
				focusBorderColor="custom.primary"
				type="search"
				placeholder="Search"
				h={{ base: "12", md: "16" }}
				fontSize={{ base: "md", md: "2xl" }}
				fontWeight={{ md: "semibold" }}
				border="none"
				_focusVisible={{
					outline: "none",
				}}
				onChange={({ target: { value } }) => onChange(value)}
			/>
		</Box>
	);
};

const SearchModal = ({ isOpen, onClose }) => {
	return (
		<Modal size={{ base: "xs", md: "xl" }} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalBody>
					<ModalContent display="flex" alignItems="stretch">
						<SearchBar onChange={(value) => console.log(value)} />
					</ModalContent>
				</ModalBody>
			</ModalOverlay>
		</Modal>
	);
};

export default SearchModal;
