import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const MountPortalComp = ({node, children}) => {
	const [isRootClear, setRootClear] = useState(false);

	useEffect(() => {
		if (isRootClear) return;
		if (node.children.length > 0) {
			node.innerHTML = "";
		} else {
			setRootClear(true);
		}
	}, [isRootClear]);

	if (!isRootClear) return null;

	return createPortal(children, node);
}

export default MountPortalComp