import { useMemo, useEffect, useState } from "react";

// UI Components
import { Box, Flex } from "@chakra-ui/react";

// Custom Components
import PageHeader from "./PageHeader";
import { PageFieldSkeleton } from "./PageSkeleton";
import { Editable, EditableSelect, EditableEditor } from "./Editable";
import EditableAvatar from "./EditableAvatar";

// Custom hooks
import syncFieldsWithServer from "../../helpers/syncFieldsWithServer";
import prepareImagesForUpload from "../../helpers/prepareImagesForUpload";
import useUploadImages from "../../helpers/useUploadImages";

const FieldsPage = ({ structure }) => {
    const initialData = useMemo(() => {
        const object = {};
        structure.map(({ name }) => (object[name] = ""));
        return object;
    }, []);

    const {
        isFieldsUploading,
        isFetching,
        localFields,
        updateField,
        syncFields,
    } = syncFieldsWithServer("managment/user-profile", initialData);

    const uploadImage = useUploadImages("pilot_upload");

    const handleChange = ({ target: { name, value } }) => {
        updateField({
            [name]: value,
        });
    };

    const [filesUploadedSuccessfuly, setFilesUploadedSuccessfuly] =
        useState(false);
    const [filesUploading, setFilesUploading] = useState(false);

    const handleSave = async () => {
        const [payloadArray, filesNames] = prepareImagesForUpload(localFields);

        if (filesNames.length > 0) {
            setFilesUploading(true);
            const filesUploaded = await Promise.all(
                payloadArray.map((formData) => uploadImage(formData))
            );

            if (filesUploaded) {
                updateField({
                    ...filesNames,
                });
                setFilesUploadedSuccessfuly(true);
            }
        } else {
            syncFields(localFields);
        }
    };

    useEffect(() => {
        if (!filesUploadedSuccessfuly) return;

        syncFields(localFields);
        setFilesUploading(false);
        setFilesUploadedSuccessfuly(false);
    }, [filesUploadedSuccessfuly]);

    const getAvatar = (src) => {
        if (typeof src == "string") {
            return `${import.meta.env.VITE_APP_IMG_URL}${src}.webp`;
        }
        return src;
    };

    return (
        <>
            <PageHeader
                title="Profile Settings"
                description="Edit personal and public information"
                btnText="Save"
                enableSearch={false}
                disableBtn={!localFields.modified}
                isBtnLoading={isFetching || isFieldsUploading || filesUploading}
                onBtnClick={handleSave}
            />
            <Box p="1" h="calc(100% - 6rem)" overflowY="auto">
                {isFetching && <PageFieldSkeleton />}
                {!isFetching && structure?.length > 0 && (
                    <Flex
                        p="1"
                        wrap="wrap"
                        overflowY="auto"
                        gap={{ base: "8", md: "12", lg: "16" }}
                    >
                        {structure.map(({ name, label, type }) => {
                            switch (type) {
                                case "image":
                                    return (
                                        <EditableAvatar
                                            key={name}
                                            name={name}
                                            label={label}
                                            src={getAvatar(localFields[name])}
                                            onChange={(file) =>
                                                handleChange({
                                                    target: {
                                                        name,
                                                        value: file,
                                                    },
                                                })
                                            }
                                        />
                                    );
                                    break;

                                case "multi_select":
                                    break;

                                case "single_select":
                                    return (
                                        <EditableSelect
                                            key={name}
                                            name={name}
                                            label={label}
                                            value={localFields[name]}
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
                                            key={name}
                                            name={name}
                                            label={label}
                                            initialText={localFields[name]}
                                            getTextOnClose={handleChange}
                                        />
                                    );
                                    break;

                                case "date":
                                    return (
                                        <Editable
                                            key={name}
                                            name={name}
                                            label={label}
                                            value={localFields[name]}
                                            type="date"
                                            onChange={handleChange}
                                        />
                                    );
                                    break;

                                default:
                                    return (
                                        <Editable
                                            key={name}
                                            name={name}
                                            label={label}
                                            value={localFields[name]}
                                            onChange={handleChange}
                                        />
                                    );
                                    break;
                            }
                        })}
                    </Flex>
                )}
            </Box>
        </>
    );
};

export default FieldsPage;
