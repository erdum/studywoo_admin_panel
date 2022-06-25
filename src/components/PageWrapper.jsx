import { Box, ScaleFade } from "@chakra-ui/react";

const PageWrapper = ({ children, mount }) => {
	return (
		<ScaleFade in={mount} initialScale={0.6} style={{ height: "100%" }}>
			<Box
				w="100%"
				h="100%"
				bg="white"
				borderRadius="lg"
				boxShadow="base"
			>
				{children}
			</Box>
		</ScaleFade>
	);
};

export default PageWrapper;
