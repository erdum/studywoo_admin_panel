import { useState, useEffect } from "react";
import { useQuery } from "react-query";

// UI Components
import {
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Center,
	Box,
	Button,
	Icon,
	Heading,
	Text,
	useToast,
} from "@chakra-ui/react";

// Icons
import { FaIdBadge, FaLock } from "react-icons/fa";

import { toastSettings } from "../setting";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

// Helper functions
import storage from "../helpers/storage";

const Login = () => {
	const [isPassInvalid, setPassInvalid] = useState(false);
	const [credentials, setCredentials] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const toast = useToast();
	const { setUser } = useStateContext();

	const authenticateUser = async () => {
		if (!credentials) return;
		const req = await fetch(`${import.meta.env.VITE_APP_API_URL}login`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (req.status !== 200) {
			throw new Error("Request failed", { cause: req.status });
		}
		const data = await req.json();
		return data;
	};

	const successHandler = (data) => {
		if (!data) return;

		const id = "login-success";
		if (!toast.isActive(id)) {
			toast({
				...toastSettings,
				id,
				title: "Logged in",
				description: "You are successfuly logged in",
				status: "success",
			});
		}

		const payload = {
			name: data?.user_data?.name,
			avatar: data?.user_data?.avatar,
			email: data?.user_data?.email,
		};
		setUser(payload);
		storage.setItem("accessToken", data.access_token);
	};

	const errorHandler = (error) => {
		if (!error) return;

		if (error.cause === 401) {
			setPassInvalid("Wrong password !");
		} else {
			const id = "login-error";
			if (!toast.isActive(id)) {
				toast({
					...toastSettings,
					id,
					title: "Login Failed",
					description:
						error.cause === undefined
							? "Network error! check your Internet connection"
							: "Request failed from the server !",
					status: "error",
				});
			}
		}
	};

	const { refetch, isLoading } = useQuery("userData", authenticateUser, {
		enabled: false,
		refetchOnWindowFocus: false,
		retry: 0,
		onSuccess: successHandler,
		onError: errorHandler,
	});

	useEffect(() => {
		if (credentials) refetch();
	}, [credentials]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const [{ value: username }, { value: pass }] = event.target.elements;

		if (pass.length >= 6) {
			setCredentials({ email: username, password: pass });
		} else {
			setPassInvalid("Password should be 6 characters long");
		}
	};

	return (
		<Center w="100%" h="100%" position="relative">
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
						<FormLabel fontSize="sm" color="blackAlpha.700" htmlFor="username">
							Email
						</FormLabel>
						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<Icon color="gray.500" as={FaIdBadge} />}
							/>
							<Input
								id="username"
								type="text"
								focusBorderColor="custom.primary"
								autoComplete="on"
							/>
						</InputGroup>
						<FormErrorMessage>Email does not match!</FormErrorMessage>
					</FormControl>
					<FormControl mt="4" isRequired isInvalid={isPassInvalid}>
						<FormLabel fontSize="sm" color="blackAlpha.700" htmlFor="password">
							Password
						</FormLabel>
						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<Icon color="gray.500" as={FaLock} />}
							/>
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								focusBorderColor="custom.primary"
								onChange={() => setPassInvalid(false)}
								pr="24"
								autoComplete="on"
							/>
							<InputRightElement w="20">
								<Button
									h="6"
									mx="2"
									size="sm"
									onClick={() =>
										setShowPassword((showPassword) => !showPassword)
									}
								>
									{showPassword ? "hide" : "show"}
								</Button>
							</InputRightElement>
						</InputGroup>
						<FormErrorMessage>{isPassInvalid}</FormErrorMessage>
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
			<Text
				w={{ base: "100%", lg: "auto" }}
				textAlign="center"
				position="absolute"
				bottom="0"
				left={{ base: "50%", lg: "0" }}
				transform={{ base: "translateX(-50%)", lg: "translateX(0)" }}
				fontStyle="italic"
				fontSize="sm"
				color="gray.500"
				fontWeight="medium"
			>
				Erdum IT group Pakistan
			</Text>
		</Center>
	);
};

export default Login;
