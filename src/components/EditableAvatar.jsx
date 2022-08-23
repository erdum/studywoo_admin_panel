import { useRef } from "react";

import {
	FormControl,
	FormLabel,
	InputGroup,
	Input,
	InputRightElement,
	InputLeftElement,
	Icon,
	Avatar,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";

const EditableAvatar = ({ label, name, onChange, src }) => {
	const avatarRef = useRef(null);

	const handleFileSelect = () => {
		avatarRef.current.click();
	};

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
				<InputLeftElement>
					<Avatar
						src={src}
						size={{ base: "md", lg: "lg" }}
						ml={{ base: "2", lg: "6" }}
						mt={{ base: "4", lg: "8" }}
					/>
				</InputLeftElement>
				<Input
					ref={avatarRef}
					display="none"
					id={name}
					name={name}
					type="file"
					onChange={(event) => onChange(event.target.files)}
				/>
				<InputRightElement onClick={handleFileSelect}>
					<Icon color="gray.500" as={FaPen} mt={{ base: "4", lg: "8" }} />
				</InputRightElement>
			</InputGroup>
		</FormControl>
	);
};

export default EditableAvatar;
