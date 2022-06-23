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
	Heading,
} from "@chakra-ui/react";
import { FaIdBadge, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";
import { toastSettings } from "../setting";

const authenticateUser = async ({ queryKey: [_, credentials] }) => {
	const req = await fetch(`${process.env.REACT_APP_API_URL}login`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (req.status === 401) throw new Error("Unauthorized", { cause: 401 });
	if (req.status !== 200) throw new Error("Request failed");
	return req.json();
};

const Login = () => {
	const [isPassInvalid, setPassInvalid] = useState(false);
	const [credentials, setCredentials] = useState(null);
	const toast = useToast();
	const { data, error, refetch, isLoading, isSuccess } = useQuery(
		["userData", credentials],
		authenticateUser,
		{
			enabled: false,
			refetchOnWindowFocus: false,
			retry: 0,
		}
	);

	useEffect(() => {
		if (!error) return;

		if (error.cause === 401) {
			setPassInvalid(true);
		} else {
			const id = "login-error";
			toast({
				...toastSettings,
				id,
				title: "Login Failed",
				description: "Request failed from the server !",
				status: "error",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	useEffect(() => {
		const id = "login-success";
		if (isSuccess && !toast.isActive(id))
			toast({
				...toastSettings,
				id,
				title: "Logged in",
				description: "You are successfuly logged in",
				status: "success",
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	useEffect(() => {
		if (data) console.log(data);
	}, [data]);

	useEffect(() => {
		if (credentials) refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [credentials]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const [{ value: username }, { value: pass }] = event.target.elements;
		setCredentials({ email: username, password: pass });
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
				<Heading
					textAlign="center"
					color="gray.500"
					as="h2"
					fontSize={{ base: "xl", lg: "2xl" }}
					lineHeight="base"
					fontWeight="semibold"
				>
					Welcome to Studywoo Content managment system
				</Heading>
				<form onSubmit={handleSubmit}>
					<FormControl mt="8" isRequired>
						<FormLabel
							fontSize="sm"
							color="blackAlpha.700"
							htmlFor="username"
						>
							Email
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
							/>
						</InputGroup>
						<FormErrorMessage>
							Email does not match!
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
