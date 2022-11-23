import { useEffect, useState } from "react";

const fieldsStructure = {
    name: "",
    email: "",
    password: "",
    avatar: "",
    gender: "",
    date_of_birth: "",
    about: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
};

const AccountSettings = () => {
    const { isFetching, data, updateFields, isFieldsUploading } =
        syncFieldsWithServer("managment/user-profile", fieldsStructure);

    const {
        userData: { avatar },
    } = useStateContext();

    const [fields, setFields] = useState({ ...data, changed: false });

    useEffect(() => {
        data ? setFields({ ...data, changed: false }) : null;
    }, [data]);

    const handleSave = async () => {
        if (fields.avatar && typeof fields.avatar === "object") {
            const avatar = new FormData();
            const extension = fields.avatar.name.split(".").at(-1);
            avatar.append(
                "images",
                fields.avatar,
                `${fields.email}.${extension}`
            );
            updateImage({ url: "pilot_upload", image: avatar });
        }
        // updateProfile({ ...fields, avatar: fields.email });
    };

    const handleRichText = (text) => {
        if (text !== fields.about) {
            setFields((prevState) => ({
                ...prevState,
                changed: true,
                about: text,
            }));
        }
    };

    return (
        
    );
};

export default AccountSettings;
