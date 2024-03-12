/* eslint-disable */

import { MutableRefObject, useState } from "react";
import "./datatable.css";

import { DataGrid, GridApi, GridColDef } from "@mui/x-data-grid";
import Icon from "../../icons";

export type PaginationModel = {
	page: number;
	pageSize: number;
	totalRowCount: number;
};

export type TableProps = {
	rows: any[];
	columns: GridColDef[];
	apiRef: MutableRefObject<GridApi | null>;
	editRowId?: string;
	updateRow?: (updatedRow: any, originalRow: any) => any;
	rowHeight?: number;
  paginationModel: PaginationModel,
  setPaginationModel: any
};

const ServerDatatable = ({
	rows,
	columns,
	apiRef,
	editRowId,
	rowHeight,
	updateRow,
  paginationModel,
  setPaginationModel
}: TableProps) => {
	const [rowsPerPage, setRowsPerPage] = useState(paginationModel.pageSize);

	const handlePageChange = (params) => {
    setPaginationModel({
      ...paginationModel,
      page: params.page,
    })
	};

	const handleNextPage = () => {
		apiRef.current?.setPage(paginationModel.page + 1);
	};

	const handlePrevPage = () => {
		apiRef.current?.setPage(paginationModel.page - 1);
	};

	return (
		<div className="h-fit">
			<div className="flex flex-col space-y-6 drop-shadow-sm">
				<DataGrid
					className="datagrid"
					autoHeight
					hideFooter
					rowHeight={rowHeight ? rowHeight : 72}
					disableColumnMenu
					disableRowSelectionOnClick
          paginationMode="server"
          rows={rows.map((row, index) => ({
            ...row,
            no: `${paginationModel.page * paginationModel.pageSize + index + 1}.`
          }))}
          rowCount={paginationModel.totalRowCount}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel,
						},
					}}
					apiRef={apiRef}
					onPaginationModelChange={handlePageChange}
					pageSizeOptions={[10]}
					isCellEditable={(params) => editRowId === params.id}
					processRowUpdate={updateRow}
					sx={{
						".MuiDataGrid-columnHeaders": {
							backgroundColor: "#ECEDEF",
						},
						".MuiDataGrid-columnHeaders .MuiDataGrid-columnSeparator": {
							visibility: "hidden",
							opacity: 0,
						},
						".MuiDataGrid-row": {
							minHeight: "72px",
						},
						".MuiDataGrid-columnHeaderTitle": {
							color: "#444240",
							fontWeight: 500,
						},
						"@media (min-width: 250px)": {
							".MuiDataGrid-columnHeaderTitle": { fontSize: "12px" }, // mobiles
							".MuiDataGrid-cellContent": { fontSize: "10px" },
						},
						"@media (min-width: 768px)": {
							".MuiDataGrid-columnHeaderTitle": { fontSize: "14px" }, // Laptops
							".MuiDataGrid-cellContent": { fontSize: "13px" },
						},
						"@media (min-width: 1440px)": {
							".MuiDataGrid-columnHeaderTitle": { fontSize: "18px" }, // XL screens
							".MuiDataGrid-cellContent": { fontSize: "15px" },
						},
						backgroundColor: "white",
						borderRadius: "10px",
					}}
				/>
				<div className="-mt-1 flex justify-between">
					<p className="text-xs md:text-sm xl:text-base">
						{paginationModel.page * rowsPerPage + 1} -{" "}
						{Math.min((paginationModel.page + 1) * rowsPerPage, rows.length)} of{" "}
						{paginationModel.totalRowCount}
					</p>
					<div className="flex space-x-4 items-center">
						<button onClick={handlePrevPage} className="buttonOutlined">
							<Icon name="leftArrow" />
						</button>
						<button onClick={handleNextPage} className="buttonOutlined">
							<Icon name="rightArrow" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServerDatatable;
