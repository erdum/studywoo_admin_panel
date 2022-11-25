import FieldsPage from "../components/page_comps/FieldsPage";

const fieldsStructure = [
    {
        name: "name",
        label: "Name",
    },
    {
        name: "email",
        label: "Email",
    },
    {
        name: "password",
        label: "Password",
    },
    {
        name: "avatar",
        label: "Profile picture",
        type: "image",
    },
    {
        name: "gender",
        label: "Gender",
        type: "single_select",
    },
    {
        name: "date_of_birth",
        label: "Date of birth",
        type: "date",
    },
    {
        name: "about",
        label: "About",
        type: "rich_text",
    },
    {
        name: "facebook",
        label: "Facebook",
    },
    {
        name: "instagram",
        label: "Instagram",
    },
    {
        name: "twitter",
        label: "Twitter",
    },
    {
        name: "linkedin",
        label: "Linkedin",
    },
];

const AccountSettings = () => {
    return <FieldsPage structure={fieldsStructure} />;
};

export default AccountSettings;
