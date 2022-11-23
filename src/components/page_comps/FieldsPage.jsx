// UI Components
import { Box, Flex } from "@chakra-ui/react";

// Custom Components
import PageHeader from "../components/page_comps/PageHeader";
import { PageFieldSkeleton } from "../components/page_comps/PageSkeleton";
import {
    Editable,
    EditableSelect,
    EditableEditor,
} from "../components/page_comps/Editable";
import EditableAvatar from "../components/page_comps/EditableAvatar";

// Custom hooks
import syncFieldsWithServer from "../helpers/syncFieldsWithServer";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

const FieldsPage = ({ fields }) => {
    const handleChange = ({ target: { name, value } }) => {
        setFields((prevState) => ({
            ...prevState,
            changed: true,
            [name]: value,
        }));
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
        <>
            <PageHeader
                title="Profile Settings"
                description="Edit personal and public information"
                btnText="Save"
                enableSearch={false}
                disableBtn={!fields.changed}
                isBtnLoading={isImageUploading || isFieldsUploading}
                onBtnClick={handleSave}
            />
            <Box p="1" h="calc(100% - 6rem)" overflowY="auto">
                {isFetching && <PageFieldSkeleton />}
                {!isFetching && fields?.length > 0 && (
                    <Flex
                        p="1"
                        wrap="wrap"
                        overflowY="auto"
                        gap={{ base: "8", md: "12", lg: "16" }}
                    >
                        {fields.map((field) => {
                            switch (field?.type) {
                                case "image":
                                    return (
                                        <EditableAvatar
                                            name={field.name}
                                            label={field.label}
                                            src={
                                                typeof data[field.name] ===
                                                "string"
                                                    ? userAvatar
                                                    : URL.createObjectURL(
                                                          data[field.name]
                                                      )
                                            }
                                            onChange={(file) => {
                                                setFields((prevFields) => ({
                                                    ...prevFields,
                                                    avatar: file,
                                                    changed: true,
                                                }));
                                            }}
                                        />
                                    );
                                    break;

                                case "multi_select":
                                    break;

                                case "single_select":
                                    return (
                                        <EditableSelect
                                            name={field.name}
                                            label={field.label}
                                            value={data[field.name]}
                                            onChange={handleChange}
                                            options={[
                                                { value: "male", text: "Male" },
                                                {
                                                    value: "female",
                                                    text: "Female",
                                                },
                                                {
                                                    value: "none-binary",
                                                    text: "None binary",
                                                },
                                            ]}
                                        />
                                    );
                                    break;

                                case "rich_text":
                                    return (
                                        <EditableEditor
                                            name={field.name}
                                            label={field.label}
                                            initialText={data[field.name]}
                                            getTextOnClose={handleRichText}
                                        />
                                    );
                                    break;

                                default:
                                    return (
                                        <Editable
                                            name={field.name}
                                            label={field.label}
                                            value={data[field.name]}
                                            onChange={handleChange}
                                        />
                                    );
                                    break;
                            }
                        })}

                        <EditableAvatar
                            label="Profile picture"
                            name="avatar"
                            src={
                                typeof fields.avatar === "string"
                                    ? avatar
                                    : URL.createObjectURL(fields.avatar)
                            }
                            onChange={(file) => {
                                setFields((prevFields) => ({
                                    ...prevFields,
                                    avatar: file,
                                    changed: true,
                                }));
                            }}
                        />
                        <EditableSelect
                            name="gender"
                            label="Gender"
                            value={fields.gender}
                            onChange={handleChange}
                            options={[
                                { value: "male", text: "Male" },
                                { value: "female", text: "Female" },
                                {
                                    value: "none-binary",
                                    text: "None binary",
                                },
                            ]}
                        />
                        <Editable
                            name="date_of_birth"
                            label="Date of birth"
                            type="date"
                            value={fields.date_of_birth}
                            onChange={handleChange}
                        />
                        <EditableEditor
                            name="about"
                            label="About"
                            initialText={fields.about}
                            getTextOnClose={handleRichText}
                        />
                        <Editable
                            name="facebook"
                            label="Facebook"
                            value={fields.facebook}
                            onChange={handleChange}
                        />
                        <Editable
                            name="instagram"
                            label="Instagram"
                            value={fields.instagram}
                            onChange={handleChange}
                        />
                        <Editable
                            name="twitter"
                            label="Twitter"
                            value={fields.twitter}
                            onChange={handleChange}
                        />
                        <Editable
                            name="linkedin"
                            label="Linkedin"
                            value={fields.linkedin}
                            onChange={handleChange}
                        />
                    </Flex>
                )}
            </Box>
        </>
    );
};

export default FieldsPage;
