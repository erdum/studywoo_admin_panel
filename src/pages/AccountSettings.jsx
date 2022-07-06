import { useEffect, useState } from "react";

// UI Components
import { Box, Flex } from "@chakra-ui/react";

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

const AccountSettings = () => {
	const [fields, setFields] = useState({
		name: "Erdum",
		email: "",
		password: "",
		gender: "",
		date_of_birth: "2004-10-29",
		facebooke: "",
		instagram: "",
		twitter: "",
		linkedin: "",
	});
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const req = await request("managment/user-profile", {});
			const data = await req.json();
			console.log(data);
			setLoading(false);
		})();
	}, []);

	const handleChange = ({ target: { name, value } }) => {
		setFields((prevState) => ({
			...prevState,
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
				disableBtn
				isBtnLoading={false}
			/>
			<Box p="1" h={{ base: "calc(100% - 6rem)", lg: "500px" }} overflowY="auto">
				{isLoading && <PageFieldSkeleton />}
				{!isLoading && (
					<Flex p="1" wrap="wrap" overflowY="auto" gap={{ base: "8", md: "12", lg: "16" }}>
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
						<EditableAvatar label="Profile picture" name="avatar" />
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
