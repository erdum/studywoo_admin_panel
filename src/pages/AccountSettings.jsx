import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";

// UI Components
import { Box, Flex } from "@chakra-ui/react";

// Helper functions
import request from "../helpers/request";

// Custom Components
import PageHeader from "../components/page_comps/PageHeader";
import { PageFieldSkeleton } from "../components/page_comps/PageSkeleton";
import {
	Editable,
	EditableSelect,
	EditableEditor,
} from "../components/page_comps/Editable";
import EditableAvatar from "../components/page_comps/EditableAvatar";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const AccountSettings = () => {
	const { data, isFetching } = useQuery(
		"managment/user-profile",
		async ({ queryKey }) => request(queryKey, showAppToast),
		{
			retry: 0,
			refetchOnWindowFocus: false,
			initialData: {
				name: "",
				email: "",
				password: "",
				avatar: "",
				gender: "",
				date_of_birth: "",
				about: "",
				facebook: "",
				instagram: "",
				twitter: "",
				linkedin: "",
			},
		}
	);

	const [fields, setFields] = useState({ ...data, changed: false });

	useEffect(() => {
		data ? setFields({ ...data, changed: false }) : null;
	}, [data]);

	const {
		showAppToast,
		changeUserAvatar,
		userData: { avatar },
	} = useStateContext();

	const { mutate: updateProfile } = useMutation(
		(payload) =>
			request("managment/user-profile", showAppToast, {
				method: "PUT",
				body: payload,
			}),
		{
			onSuccess: () => {
				changeUserAvatar(fields.avatar);
				setFields((prevState) => ({ ...prevState, changed: false }));
			},
		}
	);

	const uploadAvatar = useMutation((payload) => {
		request("pilot_upload", showAppToast, {
			method: "POST",
			body: payload,
		});
	});

	const handleChange = ({ target: { name, value } }) => {
		setFields((prevState) => ({
			...prevState,
			changed: true,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		if (fields.avatar && typeof fields.avatar === "object") {
			const avatar = new FormData();
			const extension = fields.avatar.name.split(".").at(-1);
			avatar.append("images", fields.avatar, `${fields.email}.${extension}`);
			uploadAvatar.mutate(avatar);
		}
		updateProfile({ ...fields, avatar: fields.email });
	};

	const handleRichText = (text) => {
		if (text !== fields.about) {
			setFields((prevState) => ({ ...prevState, changed:true, about: text }));
		}
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
				{isFetching && <PageFieldSkeleton />}
				{!isFetching && (
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
							src={
								typeof fields.avatar === "string"
									? avatar
									: URL.createObjectURL(fields.avatar)
							}
							onChange={(file) => {
								setFields((prevFields) => ({
									...prevFields,
									avatar: file,
									changed: true,
								}));
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
						<EditableEditor
							name="about"
							label="About"
							initialText={fields.about}
							getTextOnClose={handleRichText}
						/>
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
