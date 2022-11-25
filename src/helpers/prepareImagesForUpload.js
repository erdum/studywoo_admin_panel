const prepareImagesForUpload = (fields) => {
    const payload = new FormData();
    const names = [];
    Object.entries(fields).filter(([fieldName, file]) => {
        if (file?.constructor != File) return false;

        const fileName = btoa(Math.random() * 100).slice(0, 10);
        const extension = file.name.split(".").at(-1);

        payload.append("images[]", file, `${fileName}.${extension}`);
        names.push(fileName);
    });

    return [payload, names];
};

export default prepareImagesForUpload;
