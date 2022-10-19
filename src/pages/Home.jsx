import { useState, useDeferredValue, useMemo } from "react";
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
import filterRows from "../helpers/filterRows";

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
		field: "full_name",
		headerName: "Applicant Name",
		width: 400,
	},
	{
		field: "mobile_number",
		headerName: "Applicant Phone",
		width: 300,
	},
	{
		field: "email",
		headerName: "Applicant Email",
		width: 400,
	},
	{
		field: "college_name",
		headerName: "Applied College",
		width: 500,
	},
	{
		field: "course_name",
		headerName: "Applied Course",
		width: 250,
	},
	{
		field: "created_at",
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

	const [searchValue, setSearchValue] = useState("");
	const searchedText = useDeferredValue(searchValue);
	const filteredData = useMemo(
		() => filterRows(data, searchedText),
		[searchedText]
	);
	const [selectedRows, setSelectedRows] = useState([]);
	const shouldShowMenu = selectedRows?.length > 0;

	return (
		<>
			<PageHeader
				title="Applications"
				description="All the applications for college admissions"
				btnText="Save"
				enableSearch
				disableBtn
				enableMenu={shouldShowMenu}
				onSearch={(value) => setSearchValue(value)}
			/>
			<Box p={{ lg: "1" }} h="calc(100% - 6rem)" overflowY="auto">
				{isFetching && <PageTableSkeleton />}
				{!isFetching && (
					<ThemeProvider theme={dataGridTheme}>
						<DataGrid
							checkboxSelection
							columns={columns}
							rows={filteredData ?? data ?? []}
							selectionModel={selectedRows}
							onSelectionModelChange={(newSelectedRows) =>
								setSelectedRows(newSelectedRows)
							}
						/>
					</ThemeProvider>
				)}
			</Box>
		</>
	);
};

export default Home;
