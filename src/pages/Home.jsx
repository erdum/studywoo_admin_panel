import { useState, useEffect } from "react";
import { useQuery } from "react-query";

// UI Components
import { Box } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Components
import PageHeader from "../components/PageHeader";
import { PageTableSkeleton } from "../components/PageSkeleton";

// Helper functions
import request from "../helpers/request";

// App State Context
import useStateContext from "../contexts/StateContextProvider";

// Table Columns Defination
const columns = [
	{
		field: "id",
		headerName: "Application ID",
		width: 160,
	},
	{
		field: "applicant_name",
		headerName: "Applicant Name",
		width: 400,
	},
	{
		field: "applicant_phone",
		headerName: "Applicant Phone",
		width: 300,
	},
	{
		field: "applicant_email",
		headerName: "Applicant Email",
		width: 400,
	},
	{
		field: "applied_college",
		headerName: "Applied College",
		width: 500,
	},
	{
		field: "applied_course",
		headerName: "Applied Course",
		width: 250,
	},
	{
		field: "applied_date",
		headerName: "Applied Date",
		width: 250,
		type: "date",
	},
];

const Home = () => {
	const dataGridTheme = createTheme();
	const { showAppToast } = useStateContext();
	const { data, isFetching } = useQuery(
		"managment/applications",
		async ({ queryKey }) => request(queryKey, showAppToast),
		{
			retry: 0,
			refetchOnWindowFocus: false,
			initialData: [],
		}
	);

	const [rows, setRows] = useState(data);

	useEffect(() => {
		data ? setRows({ data }) : null;
	}, [data]);

	return (
		<>
			<PageHeader
				title="Applications"
				description="All the applications for college admissions"
				btnText="Save"
				enableSearch
				disableBtn
			/>
			<Box p="1" h="calc(100% - 6rem)" overflowY="auto">
				{isFetching && <PageTableSkeleton />}
				{!isFetching && (
					<ThemeProvider theme={dataGridTheme}>
						<DataGrid columns={columns} rows={[]} />
					</ThemeProvider>
				)}
			</Box>
		</>
	);
};

export default Home;
