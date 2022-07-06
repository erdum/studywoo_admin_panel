import { Tooltip } from "@chakra-ui/react";

import useStateContext from "../contexts/StateContextProvider";

const HeaderAction = ({ onClick }) => {
	const {
		userData: { avatar, name },
	} = useStateContext();

	return (
		<Tooltip hasArrow label="profile settings">
			<div
				onClick={onClick}
				className={
					"flex items-center gap-2 text-gray-500 font-semibold cursor-pointer rounded-md z-10 px-4 py-1 hover:bg-gray-100"
				}
			>
				<img
					src={
						`${import.meta.env.VITE_APP_IMG_URL}${avatar}.webp` ??
						"./avatar_placeholder.jpg"
					}
					className={
						"hidden w-10 aspect-square rounded-full object-cover lg:block"
					}
				/>
				<p className={"hidden lg:block"}>{name ?? "Not logged in"}</p>
			</div>
		</Tooltip>
	);
};

export default HeaderAction;
