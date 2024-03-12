/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { incomeReportRows, incomeReportSheet } from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import {
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import TableComponent from "../../../components/table/table";
import { formatDates, formatNumber } from "../../../utils";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { incomeReport } from "../../../store/actions/incomeReport.action";
import { useDispatch } from "react-redux";

const IncomeReport = () => {
	const [selectedDate, setSelectedDate] = useState(dayjs());
	const [data, setData] = useState<any>();
	const [sheet, setSheet] = useState(incomeReportSheet.daily);
	const [daily, setDaily] = useState(true);
	const [monthly, setMonthly] = useState(false);
	const [yearly, setYearly] = useState(false);
	const apiRef = useRef(null);
	const { control } = useForm({ mode: "onChange" });
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [paginationModel, setPaginationModel] = React.useState({
		page: 0,
		pageSize: 5,
		totalRowCount: 0,
	});

	const goBack = () => {
		navigate(-1);
	};

	const fetchReport = async () => {
		try {
			const _date = selectedDate.format("YYYY-MM-DD");
			const startOfDay = moment
				.utc(`${_date}T00:00:00Z`)
				.format("YYYY-MM-DDTHH:mm:ss[Z]");
			const endOfDay = moment
				.utc(`${_date}T23:59:59Z`)
				.format("YYYY-MM-DDTHH:mm:ss[Z]");
			const { data } = await dispatch(
				incomeReport.getDailyIncomeReport({
					from_date: startOfDay,
					to_date: endOfDay,
					page: paginationModel.page,
					pageSize: paginationModel.pageSize,
				}) as any
			);
			setPaginationModel({
				page: data.pageInfo.page,
				pageSize: data.pageInfo.pageSize,
				totalRowCount: data.pageInfo.totalRowCount,
			});
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchReport();
	}, [selectedDate.format("YYYY-MM-DD")]);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	// {
	//   id: '47ca0707-81e5-425b-97ad-a5d5d25c733d',
	//   name: 'china counter',
	//   total_income: { _sum: { delivery_fee: null } },
	//   total_pickup: { _sum: { delivery_fee: null } },
	//   total_delivery: { _sum: { delivery_fee: null } }
	// }

	const amountColumns: GridColDef[] = [
		{
			field: "no",
			headerName: "No.",
			width: 92,
		},
		{
			field: "counter",
			headerName: "Counter",
			width: 257,
			renderCell: (params) => {
				return (
					<Link
						to={"/reports/income/" + params.row.id}
						className="text-primary"
					>
						{params.row.name}
					</Link>
				);
			},
		},
		{
			field: "income",
			headerName: "Total Income",
			width: 193,
			renderCell: (params) => {
				return (
					<p className="text-primary">
						{formatNumber(params.row.total_income?._sum?.delivery_fee)}
					</p>
				);
			},
		},
		{
			field: "pickup",
			headerName: "Pickup Amount",
			width: 214,
			renderCell: (params) => {
				return (
					<p className="text-primary">
						{formatNumber(params.row.total_pickup?._sum?.delivery_fee)}
					</p>
				);
			},
		},
		{
			field: "delivery",
			headerName: "Delivery Amount",
			width: 205,
			renderCell: (params) => {
				return (
					<p className="text-primary">
						{formatNumber(params.row.total_delivery?._sum?.delivery_fee)}
					</p>
				);
			},
		},
	];

	const actionColumn: GridColDef[] = [
		{
			field: "action",
			headerName: "Action",
			width: 110,
			headerAlign: "center",
			align: "center",
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Link
							to={"/reports/income/" + params.row.id}
							className="buttonPrimary space-x-2 h-10"
						>
							<Icon name="details" />
							<span>Detail</span>
						</Link>
					</div>
				);
			},
		},
	];

	const activeButton = `bg-primary text-white  w-[360px] h-[52px] flex items-center justify-between px-6 text-xl font-normal`;
	const inactiveButton = `bg-gray-light-1 text-secondary w-[360px] h-[52px] flex items-center justify-between px-6 text-xl font-normal`;

	const dailyHandler = () => {
		// setData(incomeReportRows.daily);
		setDaily(true);
		setMonthly(false);
		setYearly(false);
	};

	const monthlyHandler = () => {
		// setData(incomeReportRows.monthly);
		setMonthly(true);
		setDaily(false);
		setYearly(false);
	};

	const yearlyHandler = () => {
		// setData(incomeReportRows.yearly);
		setMonthly(false);
		setDaily(false);
		setYearly(true);
	};

	// {
	//   "total_income": {
	//     "_sum": {
	//         "delivery_fee": null
	//     }
	// },
	// "pickup_amount": {
	//     "_sum": {
	//         "delivery_fee": null
	//     }
	// },
	// "delivery_amount": {
	//     "_sum": {
	//         "delivery_fee": null
	//     }
	// },
	// }

	const tableBodyData = (
		<>
			<TableRow>
				<TableCell colSpan={1} align="center">
					Today Income
				</TableCell>
				<TableCell colSpan={1} align="center">
					{formatNumber(data?.total_income?._sum?.delivery_fee)} Ks
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell colSpan={1} align="center">
					Pickup Amount
				</TableCell>
				<TableCell colSpan={1} align="center">
					{formatNumber(data?.pickup_amount?._sum?.delivery_fee)} Ks
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell colSpan={1} align="center">
					Delievery Amount
				</TableCell>
				<TableCell colSpan={1} align="center">
					{formatNumber(data?.delivery_amount?._sum?.delivery_fee)} Ks
				</TableCell>
			</TableRow>
		</>
	);

	// const tableBodyData = (
	// 	<>
	// 		{sheet.map((data) => (
	// 			<TableRow>
	// 				<TableCell colSpan={1} align="center">
	// 					{data.key}
	// 				</TableCell>
	// 				<TableCell colSpan={1} align="center">
	// 					{data.value}
	// 				</TableCell>
	// 			</TableRow>
	// 		))}
	// 	</>
	// );
	return (
		<div className="flex flex-col space-y-6">
			<div className="flex items-center rounded-[10px] overflow-hidden">
				<div
					className={daily ? activeButton : inactiveButton}
					onClick={dailyHandler}
				>
					Today <Icon name="calendar" color={daily ? "#fff" : "#444240"} />
				</div>
				<Divider orientation="vertical" sx={{ backgroundColor: "#444240" }} />
				<div
					className={monthly ? activeButton : inactiveButton}
					onClick={monthlyHandler}
				>
					Monthly
					<Icon name="calendar" color={monthly ? "#fff" : "#444240"} />
				</div>
				<Divider orientation="vertical" sx={{ backgroundColor: "#444240" }} />
				<div
					className={yearly ? activeButton : inactiveButton}
					onClick={yearlyHandler}
				>
					Yearly
					<Icon name="calendar" color={yearly ? "#fff" : "#444240"} />
				</div>
			</div>
			{/* <div className="flex">
				<div className="w-[300px]">
					<DatePicker
						sx={{
							width: "100%",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							backgroundColor: "white",
						}}
						value={selectedDate}
						openTo="day"
						// views={["day", "year", "month"]}
						onChange={handleDateChange}
					/>
				</div>
			</div> */}
			{data && (
				<>
					<TableComponent
						colSpan={2}
						header={`Today - ${selectedDate.format("D MMM YYYY")}`}
						data={tableBodyData}
					/>

					<Datatable
						rows={data?.total_income_counter}
						columns={amountColumns.concat(actionColumn)}
						apiRef={apiRef}
					/>
				</>
			)}
		</div>
	);
};

export default IncomeReport;
