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
				px={{ base: "4", md: "6" }}
				py={{ base: "1", md: "4" }}
				overflowY="hidden"
				overflowX="hidden"
			>
				{children}
			</Box>
		</ScaleFade>
	);
};

export default PageWrapper;
