import getScreenDim from "../helpers/getScreenDim";

import { SkeletonText, Skeleton, Flex, Box, useTheme } from "@chakra-ui/react";

const PageFieldSkeleton = () => {
	const { width } = getScreenDim();
	const theme = useTheme();

	const SingleSkeleton = () => (
		<Box w={{ base: "100%", md: "45%", lg: "64" }}>
			<SkeletonText w={{ base: "50%" }} noOfLines={2} />
			<Skeleton h="10" mt="4" />
		</Box>
	);

	return (
		<Flex
			wrap={{ base: "wrap" }}
			gap={{ base: "10", md: "14", lg: "16" }}
			justify={{ md: "center", lg: "start" }}
		>
			<SingleSkeleton />
			<SingleSkeleton />
			<SingleSkeleton />
			<SingleSkeleton />
			{width >= theme.breakpoints.md && (
				<>
					<SingleSkeleton />
					<SingleSkeleton />
					<SingleSkeleton />
					<SingleSkeleton />
				</>
			)}
			{width >= theme.breakpoints.lg && (
				<>
					<SingleSkeleton />
					<SingleSkeleton />
					<SingleSkeleton />
					<SingleSkeleton />
				</>
			)}
		</Flex>
	);
};

const PageTableSkeleton = () => {};

export { PageFieldSkeleton, PageTableSkeleton };
