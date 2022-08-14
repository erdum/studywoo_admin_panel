import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";

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

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const AccountSettings = () => {
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
	const [avatarImg, setAvatarImg] = useState(null);
	const { showAppToast } = useStateContext();

	const { data, isLoading } = useQuery(
		"managment/user-profile",
		({ queryKey }) => request(queryKey, showAppToast),
		{
			refetchOnWindowFocus: false,
			retry: 0,
		}
	);
	const updateProfile = useMutation(() =>
		request("managment/user-profile", showAppToast, {
			method: "PUT",
			body: fields,
		})
	);

	const uploadAvatar = useMutation((avatar) => {
		request("pilot_upload", showAppToast, {
			method: "POST",
			body: avatar,
		});
	});

	useEffect(() => {
		if (!data) return;

		const [userData] = data;
		console.log(userData);
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

	const handleChange = ({ target: { name, value } }) => {
		setFields((prevState) => ({
			...prevState,
			changed: true,
			[name]: value,
		}));
	};

	const handleSave = () => {
		if (avatarImg) {
			const avatar = new FormData();
			const extension = avatarImg.name.split(".").at(-1);
			avatar.append("images", avatarImg, `${fields.email}.${extension}`);
			uploadAvatar.mutate(avatar);
		}
		updateProfile.mutate();
	};

	return (
		<>
			<PageHeader
				title="Profile Settings"
				description="Edit personal and public information"
				btnText="Save"
				enableSearch={false}
				disableBtn={!fields.changed}
				isBtnLoading={uploadAvatar.isLoading || updateProfile.isLoading}
				onBtnClick={handleSave}
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
							src={avatarImg ?? fields.avatar}
							onChange={(files) => {
								setFields((prevFields) => ({
									...prevFields,
									avatar: prevFields.email,
									changed: true,
								}));
								setAvatarImg(files[0]);
							}}
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
