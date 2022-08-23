const fetchImage = async (imageName) => {
	const isUrl = typeof imageName === "string";
	const isBlob = imageName instanceof Blob;

	if (isUrl) {
		const req = await fetch(`${import.meta.env.VITE_APP_IMG_URL}${imageName}.webp`);
		let blob = null;
		if (req.status === 200) {
			blob = await req.blob();
			return URL.createObjectURL(blob);
		} else {
			return null;
		}
	} else if (isBlob) {
		return URL.createObjectURL(imageName);
	} else {
		return null;
	}

};

export default fetchImage;