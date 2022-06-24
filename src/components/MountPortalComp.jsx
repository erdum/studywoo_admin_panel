import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Fade } from "@chakra-ui/react";

const MountPortalComp = ({ node, children }) => {
	const [isRootClear, setRootClear] = useState(false);

	useEffect(() => {
		if (!isRootClear) node.style.opacity = "0";

		if (!isRootClear && node.children.length > 0) {
			setTimeout(() => node.innerHTML = "", 310);
			setTimeout(() => setRootClear(true), 320);
			setTimeout(() => node.style.opacity = "1", 330);
		}
	}, [isRootClear]);

	return (
		<>
			{isRootClear && createPortal(children, node)}
		</>
	);
};

export default MountPortalComp;
