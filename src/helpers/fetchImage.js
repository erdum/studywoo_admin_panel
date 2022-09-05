const fetchImage = async (imageName, callback) => {
	const isUrl = typeof imageName === "string";
	const isBlob = imageName instanceof Blob;

	if (isUrl) {
		const req = await fetch(
			`${import.meta.env.VITE_APP_IMG_URL}${imageName}.webp`
		);
		let blob = null;
		if (req.status === 200) {
			blob = await req.blob();
			const fileReader = new FileReader();
			fileReader.readAsDataURL(blob);
			fileReader.onload = () => {
				callback(fileReader.result);
			};
		} else {
			return null;
		}
	} else if (isBlob) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(imageName);
		fileReader.onload = () => {
			callback(fileReader.result);
		};
	} else {
		return null;
	}
};

export default fetchImage;
