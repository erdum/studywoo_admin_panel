import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Fade } from "@chakra-ui/react";

const MountPortalComp = ({ node, children }) => {
	const [isRootClear, setRootClear] = useState(false);

	useEffect(() => {
		if (!isRootClear) {
			setTimeout(() => node.style.opacity = "0", 20);
		}

		if (!isRootClear && node.children.length > 0) {
			setTimeout(() => node.innerHTML = "", 340);
			setTimeout(() => setRootClear(true), 350);
			setTimeout(() => node.style.opacity = "1", 360);
		}
	}, [isRootClear]);

	return (
		<>
			{isRootClear && createPortal(children, node)}
		</>
	);
};

export default MountPortalComp;
