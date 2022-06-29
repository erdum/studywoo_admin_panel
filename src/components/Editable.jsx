import { useState, useEffect, useRef } from "react";

import { InputGroup, Input, InputRightElement, Icon } from "@chakra-ui/react";

import { FaRegEdit } from "react-icons/fa";

const Editable = ({ placeholder, value = "", onChange = () => {} }) => {
	const ref = useRef(null);
	const [isEditable, setEditable] = useState(true);

	useEffect(() => {
		isEditable && ref.current && ref.current.blur();

		ref.current && ref.current.focus();
	}, [isEditable]);

	return (
		<InputGroup>
			<Input
				ref={ref}
				onBlur={() => setEditable(true)}
				isDisabled={isEditable}
				type="text"
				placeholder={placeholder}
				fontWeight="medium"
				_placeholder={{ color: "gray.500" }}
				_disabled={{ color: "gray.500" }}
				focusBorderColor="custom.primary"
			/>
			<InputRightElement
				onClick={() => setEditable((prevState) => !prevState)}
				children={<Icon color="gray.500" as={FaRegEdit} />}
			/>
		</InputGroup>
	);
};

export default Editable;
