import {
	Input,
	InputGroup,
	InputLeftElement,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Center,
	Box,
	Button,
	Icon,
	Heading
} from "@chakra-ui/react";
import { FaIdBadge, FaLock } from "react-icons/fa";
import { useState } from "react";

const Login = ({ authenticateUser }) => {
	const [isUsernameInvalid, setUsernameInvalid] = useState(false);
	const [isPassInvalid, setPassInvalid] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const startLoading = () => setLoading(true);

	const stopLoading = () => setLoading(false);

	const handleError = (errorObj) => {
		if (errorObj.username) {
			setUsernameInvalid(true);
		} else {
			setUsernameInvalid(false);
		}

		if (errorObj.pass) {
			setPassInvalid(true);
		} else {
			setPassInvalid(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const [{ value: username }, { value: pass }] = event.target.elements;
		authenticateUser(
			username,
			pass,
			handleError,
			startLoading,
			stopLoading
		);
	};

	return (
		<Center w="100%" h="100%">
			<Box
				bg="white"
				w={{ base: "100%", lg: "50%" }}
				maxW="400px"
				p={{ base: "8", lg: "12" }}
				borderRadius="8"
				boxShadow="lg"
			>
				<Heading textAlign="center" color="gray.500" as="h2" fontSize={{ base: "xl", lg: "2xl" }} lineHeight="base" fontWeight="semibold">Welcome to Studywoo Content managment system</Heading>
				<form onSubmit={handleSubmit}>
					<FormControl mt="8" isRequired isInvalid={isUsernameInvalid}>
						<FormLabel
							fontSize="sm"
							color="blackAlpha.700"
							htmlFor="username"
						>
							User name
						</FormLabel>
						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={
									<Icon color="gray.500" as={FaIdBadge} />
								}
							/>
							<Input
								id="username"
								type="text"
								focusBorderColor="custom.primary"
								onChange={() => setUsernameInvalid(false)}
							/>
						</InputGroup>
						<FormErrorMessage>
							Username does not match!
						</FormErrorMessage>
					</FormControl>
					<FormControl mt="4" isRequired isInvalid={isPassInvalid}>
						<FormLabel
							fontSize="sm"
							color="blackAlpha.700"
							htmlFor="password"
						>
							Password
						</FormLabel>
						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<Icon color="gray.500" as={FaLock} />}
							/>
							<Input
								id="password"
								type="password"
								focusBorderColor="custom.primary"
								onChange={() => setPassInvalid(false)}
							/>
						</InputGroup>
						<FormErrorMessage>Wrong password !</FormErrorMessage>
					</FormControl>
					<Button
						type="submit"
						w="100%"
						mt="12"
						bg="custom.primary"
						color="white"
						fontWeight="semibold"
						_active={{ bg: "custom.primary" }}
						_hover={{
							borderColor: "custom.primary",
							bg: "white",
							color: "custom.primary",
							borderWidth: "2px",
						}}
						loadingText="Verifying"
						isLoading={isLoading}
					>
						Login
					</Button>
				</form>
			</Box>
		</Center>
	);
};

export default Login;
