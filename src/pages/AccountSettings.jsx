import { useEffect, useState } from "react";
import { useQuery } from "react-query";

// UI Components
import { Box, Flex, useToast } from "@chakra-ui/react";

// Helper functions
import request from "../helpers/request";

// Custom Components
import PageHeader from "../components/PageHeader";
import { PageFieldSkeleton } from "../components/PageSkeleton";
import {
	Editable,
	EditableSelect,
	EditableEditor,
} from "../components/Editable";
import EditableAvatar from "../components/EditableAvatar";

import { toastSettings } from "../setting";

const AccountSettings = () => {
	const toast = useToast();
	const [fields, setFields] = useState({
		name: "",
		email: "",
		password: "",
		avatar: "",
		gender: "",
		date_of_birth: "",
		facebook: "",
		instagram: "",
		twitter: "",
		linkedin: "",
		changed: false,
	});
	const { data, error, isLoading } = useQuery(
		"managment/user-profile",
		({ queryKey }) => request(queryKey),
		{
			refetchOnWindowFocus: false,
			retry: 0,
		}
	);

	useEffect(() => {
		if (!data) return;

		const [userData] = data;
		setFields({
			name: userData.name ?? "",
			email: userData.email ?? "",
			password: userData.password ?? "",
			avatar: userData.avatar ?? "",
			gender: userData.gender ?? "",
			date_of_birth: userData.date_of_birth ?? "",
			facebook: userData.facebook ?? "",
			instagram: userData.instagram ?? "",
			twitter: userData.twitter ?? "",
			linkedin: userData.linkedin ?? "",
		});
	}, [data]);

	useEffect(() => {
		if (!error) return;
		const id = "request-error";
		
		if (!toast.isActive(id)) {
			toast({
				...toastSettings,
				id,
				title: "Request failed",
				description:
					error.cause === undefined
						? "Network error! check your Internet connection"
						: "Request failed from the server !",
				status: "error",
			});
		}
	}, [error]);

	const handleChange = ({ target: { name, value } }) => {
		setFields((prevState) => ({
			...prevState,
			changed: true,
			[name]: value,
		}));
	};

	return (
		<>
			<PageHeader
				title="Profile Settings"
				description="Edit personal and public information"
				btnText="Save"
				enableSearch={false}
				disableBtn={!fields.changed}
				isBtnLoading={false}
			/>
			<Box p="1" h="calc(100% - 6rem)" overflowY="auto">
				{isLoading && <PageFieldSkeleton />}
				{!isLoading && (
					<Flex
						p="1"
						wrap="wrap"
						overflowY="auto"
						gap={{ base: "8", md: "12", lg: "16" }}
					>
						<Editable
							name="name"
							label="Name"
							value={fields.name}
							onChange={handleChange}
						/>
						<Editable
							name="email"
							label="Email"
							value={fields.email}
							onChange={handleChange}
						/>
						<Editable
							name="password"
							label="Password"
							value={fields.password}
							onChange={handleChange}
						/>
						<EditableAvatar
							label="Profile picture"
							name="avatar"
							src={fields.avatar}
							onChange={(files) =>
								setFields((prevFields) => ({
									...prevFields,
									changed: true,
									avatar: files[0],
								}))
							}
						/>
						<EditableSelect
							name="gender"
							label="Gender"
							value={fields.gender}
							onChange={handleChange}
							options={[
								{ value: "male", text: "Male" },
								{ value: "female", text: "Female" },
								{
									value: "none-binary",
									text: "None binary",
								},
							]}
						/>
						<Editable
							name="date_of_birth"
							label="Date of birth"
							type="date"
							value={fields.date_of_birth}
							onChange={handleChange}
						/>
						<EditableEditor name="about" label="About" />
						<Editable
							name="facebook"
							label="Facebook"
							value={fields.facebook}
							onChange={handleChange}
						/>
						<Editable
							name="instagram"
							label="Instagram"
							value={fields.instagram}
							onChange={handleChange}
						/>
						<Editable
							name="twitter"
							label="Twitter"
							value={fields.twitter}
							onChange={handleChange}
						/>
						<Editable
							name="linkedin"
							label="Linkedin"
							value={fields.linkedin}
							onChange={handleChange}
						/>
					</Flex>
				)}
			</Box>
		</>
	);
};

export default AccountSettings;
