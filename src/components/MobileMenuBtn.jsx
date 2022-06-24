import { Icon } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

const MobileMenuBtn = ({onClick}) => {
	return (
		<>
			<Icon onClick={onClick} className={"text-gray-500 text-2xl lg:hidden"} as={FaBars} />
		</>
	)
}

export default MobileMenuBtn