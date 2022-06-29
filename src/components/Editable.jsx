import { useState, useEffect, useRef } from "react";

import {
	InputGroup,
	Input,
	InputRightElement,
	FormLabel,
	FormControl,
	Icon,
	Select,
} from "@chakra-ui/react";

import { FaPen } from "react-icons/fa";

const Editable = ({ name, value, onChange, label, type = "text" }) => {
	const ref = useRef(null);
	const [isEditable, setEditable] = useState(true);

	useEffect(() => {
		isEditable && ref.current && ref.current.blur();

		ref.current && ref.current.focus();
	}, [isEditable]);

	return (
		<FormControl w={{ md: "45%", lg: "64" }}>
			<FormLabel
				fontSize={{ base: "sm", md: "md" }}
				color="gray.500"
				htmlFor={name}
			>
				{label}
			</FormLabel>
			<InputGroup cursor="pointer">
				<Input
					id={name}
					name={name}
					ref={ref}
					onKeyDown={({ key }) =>
						key === "Escape" && setEditable(true)
					}
					value={value}
					onChange={onChange}
					onBlur={() => setEditable(true)}
					isDisabled={isEditable}
					type={type}
					fontWeight="medium"
					_placeholder={{ color: "gray.500" }}
					_disabled={{ color: "gray.500" }}
					focusBorderColor="custom.primary"
				/>
				<InputRightElement
					onClick={() => setEditable((prevState) => !prevState)}
					children={<Icon color="gray.500" as={FaPen} />}
				/>
			</InputGroup>
		</FormControl>
	);
};

const EditableSelect = ({ name, label, options, value, onChange }) => {
	return (
		<FormControl w={{ md: "45%", lg: "64" }}>
			<FormLabel
				fontSize={{ base: "sm", md: "ms" }}
				color="gray.500"
				htmlFor={name}
			>
				{label}
			</FormLabel>
			<Select
				cursor="pointer"
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				fontWeight="medium"
				color="gray.500"
				focusBorderColor="custom.primary"
				iconSize="md"
				iconColor="gray.500"
				icon={<Icon as={FaPen} />}
				autoComplete="off"
			>
				<option disabled value="">
					Select
				</option>
				{options &&
					options.map(({ value, text }) => (
						<option key={value} value={value}>
							{text}
						</option>
					))}
			</Select>
		</FormControl>
	);
};

export { Editable, EditableSelect };
