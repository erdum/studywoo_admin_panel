import { useState, useDeferredValue, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

// UI Components
import { Box } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Components
import { PageTableSkeleton } from "./PageSkeleton";
import PageHeader from "./PageHeader";

// Helper functions
import request from "../../helpers/request";
import filterRows from "../../helpers/filterRows";

// App State Context
import useStateContext from "../../contexts/StateContextProvider";

const TablePage = ({ resourcePath, columns, title, description, btnText }) => {
	const dataGridTheme = createTheme();
	const queryClient = useQueryClient();
	const { showAppToast } = useStateContext();
    
	const { data, isFetching } = useQuery(
		resourcePath,
		async ({ queryKey }) => request(queryKey, showAppToast),
		{
			retry: 0,
			refetchOnWindowFocus: false,
			initialData: [],
		}
	);

	const { mutate: deleteRows } = useMutation(
		async (rows) =>
			request(resourcePath, showAppToast, {
				body: { rows },
				method: "DELETE",
			}),
		{
			onMutate: async (payload) => {
				await queryClient.cancelQueries({
					queryKey: resourcePath,
				});

				const prevPayload = queryClient.getQueryData(resourcePath);

				queryClient.setQueryData(resourcePath, (prevPayload) =>
					prevPayload.filter(({ id }) => !payload.includes(id))
				);

				return { prevPayload };
			},
			onError: (err, newPayload, { prevPayload }) => {
				queryClient.setQueryData(resourcePath, prevPayload);
			},
		}
	);

	const [selectedRows, setSelectedRows] = useState([]);
	const shouldShowMenu = selectedRows?.length > 0;
	const [searchValue, setSearchValue] = useState("");
	const searchedText = useDeferredValue(searchValue);
	const filteredData = useMemo(
		() => filterRows(data, searchedText),
		[searchedText]
	);

	const handleBulkActions = useCallback(
		({ type }) => {
			switch (type) {
				case "edit":
					break;

				case "delete":
					deleteRows(selectedRows);
					break;

				case "export":
					break;

				default:
					break;
			}
		},
		[selectedRows]
	);

	return (
		<>
			<PageHeader
				title={title}
				description={description}
				btnText={btnText}
				enableSearch
				disableBtn
				enableMenu={shouldShowMenu}
				onSearch={(value) => setSearchValue(value)}
				onBulkAction={handleBulkActions}
			/>
			<Box p={{ lg: "1" }} h="calc(100% - 6rem)" overflowY="auto">
				{isFetching && <PageTableSkeleton />}
				{!isFetching && (
					<ThemeProvider theme={dataGridTheme}>
						<DataGrid
							checkboxSelection
							columns={columns}
							rows={
								filteredData?.length === 0
									? data ?? []
									: filteredData
							}
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

export default TablePage;
