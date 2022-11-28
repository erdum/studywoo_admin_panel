import {
	FaUserCog,
	FaRegEnvelope,
	FaUserAlt,
	FaUserEdit,
	FaCommentAlt,
	FaQuestionCircle,
	FaClipboardList,
    FaPollH,
    FaUniversity,
    FaRegCopy,
    FaCog,
} from "react-icons/fa";

const MenuLinks = [
	{
		path: "/",
		label: "Applications",
		icon: FaRegEnvelope,
	},
	{
		path: "/users",
		label: "Users",
		icon: FaUserAlt,
	},
	{
		path: "/roles",
		label: "Roles",
		icon: FaUserEdit,
	},
	{
		path: "/comments",
		label: "Comments",
		icon: FaCommentAlt,
	},
	{
		path: "/faqs",
		label: "Faqs",
		icon: FaQuestionCircle,
	},
	{
		path: "/ratings",
		label: "Ratings",
		icon: FaClipboardList,
	},
	{
		path: "/profile-settings",
		label: "Profile Settings",
		icon: FaUserCog,
	},
    {
        path: "/blogs",
        label: "Blogs",
        icon: FaPollH,
    },
    {
        path: "/colleges",
        label: "Colleges",
        icon: FaUniversity,
    },
    {
        path: "/subpages",
        label: "Subpages",
        icon: FaRegCopy,
    },
    {
        path: "/site-settings",
        label: "Site Settings",
        icon: FaCog,
    },
];

export default MenuLinks;
