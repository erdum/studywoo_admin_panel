import { Tooltip, Avatar } from "@chakra-ui/react";

import useStateContext from "../../contexts/StateContextProvider";

const HeaderAction = ({ onClick }) => {
	const {
		userData: { name, avatar },
	} = useStateContext();

	return (
		<Tooltip hasArrow label="profile settings">
			<div
				onClick={onClick}
				className="flex items-center gap-2 text-gray-500 font-semibold cursor-pointer rounded-md z-10 px-4 py-1 hover:bg-gray-100"
			>
				<Avatar src={avatar} className={"hidden lg:block"} w="2.5rem" h="2.5rem" />
				<p className={"hidden lg:block"}>{name ?? "Not logged in"}</p>
			</div>
		</Tooltip>
	);
};

export default HeaderAction;
