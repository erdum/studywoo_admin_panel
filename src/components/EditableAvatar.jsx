import { useRef } from "react";

import {
	FormControl,
	FormLabel,
	InputGroup,
	Input,
	InputRightElement,
	InputLeftElement,
	Icon,
	Avatar
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";

const EditableAvatar = ({ label, name }) => {
	const avatarRef = useRef(null);


	return (
		<FormControl w={{ base: "100%", md: "45%", lg: "64" }} pb={{ base: "12" }}>
			<FormLabel
				fontSize={{ base: "sm", md: "md" }}
				color="gray.500"
				htmlFor={name}
				fontWeight="semibold"
			>
				{label}
			</FormLabel>
			<InputGroup cursor="pointer">
				<InputLeftElement children={<Avatar size="md" ml="2" mt="4" />} />
				<Input
					ref={avatarRef}
					display="none"
					id={name}
					name={name}
					type="file"
				/>
				<InputRightElement
					onClick={() => setEditable((prevState) => !prevState)}
					children={<Icon color="gray.500" as={FaPen} mt="4" />}
				/>
			</InputGroup>
		</FormControl>
	);
};

export default EditableAvatar;
