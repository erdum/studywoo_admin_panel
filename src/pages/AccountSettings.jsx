import { useEffect, useState } from "react";

// UI Components
import { Box, Flex } from "@chakra-ui/react";

// Helper functions
import request from "../helpers/request";

// Custom Components
import PageHeader from "../components/PageHeader";
import { PageFieldSkeleton } from "../components/PageSkeleton";
import Editable from "../components/Editable";

const AccountSettings = () => {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const req = await request("managment/user-profile", {});
			const data = await req.json();
			console.log(data);
			setLoading(false);
		})();
	}, []);

	return (
		<>
			<PageHeader
				title="Admin Profile"
				description="Edit personal and public information"
				btnText="Save"
				enableSearch={false}
				disableBtn
				isBtnLoading={false}
			/>
			<Box overflowY="auto" w="100%" h="100%">
				{isLoading && <PageFieldSkeleton />}
				{!isLoading && (
					<Flex p="1">
						<Editable placeholder="name" />
					</Flex>
				)}
			</Box>
		</>
	);
};

export default AccountSettings;
