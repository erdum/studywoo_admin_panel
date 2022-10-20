import getScreenDim from "../helpers/getScreenDim";

import {
	SkeletonText,
	Skeleton,
	SkeletonCircle,
	Flex,
	Box,
	useTheme,
} from "@chakra-ui/react";

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

const PageTableSkeleton = () => {
	const SingleSkeleton = () => {
		const { width } = getScreenDim();
		const theme = useTheme();

		return (
			<Flex align="center" gap="4">
				<SkeletonCircle size="10" />
				<Skeleton h="4" flexGrow="1" />
				<Skeleton h="4" flexGrow="1" />
				{width >= theme.breakpoints.md && (
					<SkeletonText noOfLines={2} flexGrow="1" spacing="0.5" />
				)}
				{width >= theme.breakpoints.lg && (
					<Skeleton h="4" flexGrow="1" />
				)}
			</Flex>
		);
	};

	return (
		<Flex direction="column" align="stretch" gap={{ base: "8" }}>
			<SingleSkeleton />
			<SingleSkeleton />
			<SingleSkeleton />
			<SingleSkeleton />
			<SingleSkeleton />
			<SingleSkeleton />
		</Flex>
	);
};

export { PageFieldSkeleton, PageTableSkeleton };
