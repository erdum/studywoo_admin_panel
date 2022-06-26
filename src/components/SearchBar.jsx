import { InputGroup, InputLeftElement, Input, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onChange }) => {
	return (
		<InputGroup w={{ base: "100%", lg: "20%" }}>
			<InputLeftElement
				pointerEvents="none"
				children={<Icon color="gray.500" as={FaSearch} />}
			/>
			<Input
				focusBorderColor="custom.primary"
				type="search"
				placeholder="search"
				onChange={(event) => onChange(event.target.value)}
			/>
		</InputGroup>
	);
};

export default SearchBar;
