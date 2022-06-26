// Custom Components
import PageHeader from "../components/PageHeader";

const AccountSettings = () => {
	// const []

	return (
		<PageHeader
			title="Account Settings"
			description="Edit personal and public information"
			btnText="Save"
			enableSearch={false}
			disableBtn
			isBtnLoading={false}
		/>
	);
};

export default AccountSettings;
