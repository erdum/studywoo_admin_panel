import { InputGroup, InputLeftElement, Input, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onChange, ...otherProps }) => {
	return (
		<InputGroup w="100%">
			<InputLeftElement
				pointerEvents="none"
				children={<Icon color="gray.500" as={FaSearch} />}
			/>
			<Input
				{...otherProps}
				focusBorderColor="custom.primary"
				type="search"
				placeholder="search"
				onChange={(event) => onChange(event.target.value)}
			/>
		</InputGroup>
	);
};

export default SearchBar;
