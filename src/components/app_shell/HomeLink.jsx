import { NavLink } from "react-router-dom";

const HomeLink = ({ to, children }) => {
	return (
		<NavLink
			to={to}
			className={
				"font-bold px-4 lg:py-1 rounded-md text-2xl md:text-3xl cursor-pointer hover:bg-gray-100"
			}
		>
			{children}
		</NavLink>
	);
};

export default HomeLink;
