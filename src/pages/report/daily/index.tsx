/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import {
	counterOptions,
	dailyReportSheet,
	incomeReportDetail,
	incomeReportSheet,
} from "../../../layout/config";
import Icon from "../../../icons";
import Datepicker from "react-tailwindcss-datepicker";
import {
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import InputSelect from "../../../components/form/InputSelect";
import TableComponent from "../../../components/table/table";
import moment from "moment";
import { formatDates, formatNumber } from "../../../utils";
import { useDispatch } from "react-redux";
import { report } from "../../../store/actions/report.action";

const DailyReport = () => {
	const [sheet, setSheet] = useState(dailyReportSheet);
	const { control } = useForm({ mode: "onChange" });
	const dispatch = useDispatch();
	const [value, setValue] = useState(
		formatDates({
			startDate: moment().format("YYYY-MM-DD"),
			endDate: moment().format("YYYY-MM-DD"),
		})
	);
	const [data, setData] = useState<any>();
	const [incomeData, setIncomeData] = useState<any>();
	const [parcelData, setParcelData] = useState<any>();

	const fetchReport = async () => {
		try {
			const { data } = await dispatch(
				report.getReport(value.startDate, value.endDate) as any
			);
			setData(data);
			const totalIncome = {
				id: new Date(),
				name: "Total Income",
				count: { _sum: { delivery_fee: data?.total_income?._sum?.delivery_fee } },
			};
			setIncomeData([totalIncome, ...data.total_income_counter]);
			setParcelData([...data.total_parcel_counter]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchReport();
	}, [value.startDate, value.endDate]);

	const handleValueChange = (newValue) => {
		setValue(formatDates(newValue));
	};

	const customerBodyData = (
		<>
			<TableRow>
				<TableCell colSpan={1} align="center">
					Total Customers
				</TableCell>
				<TableCell colSpan={1} align="center">
					{formatNumber(data?.total_customers)}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell colSpan={1} align="center">
					New Customers
				</TableCell>
				<TableCell colSpan={1} align="center">
					{formatNumber(data?.new_customers)}
				</TableCell>
			</TableRow>
		</>
	);

	const incomeBodyData = (
		<>
			{incomeData &&
				incomeData.map((data, i) => (
					<TableRow key={i}>
						<TableCell
							colSpan={1}
							align="center"
							sx={{ color: i === 0 && "#FF6604" }}
						>
							{data.name}
						</TableCell>
						<TableCell
							colSpan={1}
							align="center"
							sx={{ color: i === 0 && "#FF6604" }}
						>
							{formatNumber(data?.count?._sum?.delivery_fee)} Ks
						</TableCell>
					</TableRow>
				))}
		</>
	);

	const parcelBodyData = (
		<>
			<TableRow>
				<TableCell
					colSpan={1}
					align="center"
					width={360}
					sx={{ color: "#FF6604" }}
				>
					Total Parcels
				</TableCell>
				<TableCell
					colSpan={1}
					align="center"
					width={360}
					sx={{ color: "#FF6604" }}
				>
					{formatNumber(data?.total_parcels)}
				</TableCell>
				<TableCell colSpan={1} width={360} sx={{ color: "#FF6604" }}>
					<p className="text-[#FF6604]">
						Scan Parcels = {formatNumber(data?.total_scan_parcels)}
					</p>
					<p className="text-[#FF6604]">
						Customize Parcels = {formatNumber(data?.total_customize_parcels)}
					</p>
					<p className="text-[#FF6604]">
						Pickup Parcels = {formatNumber(data?.total_pickup_parcels)}
					</p>
					<p className="text-[#FF6604]">
						Delivery Parcels = {formatNumber(data?.total_delivery_parcels)}
					</p>
				</TableCell>
			</TableRow>
			{parcelData &&
				parcelData?.map((data, i) => (
					<TableRow key={i}>
						<TableCell colSpan={1} align="center" width={360}>
							{data.name}
						</TableCell>
						<TableCell colSpan={1} align="center" width={360}>
							{data.total_parcel}
						</TableCell>
						<TableCell colSpan={1} width={360}>
							<p>Scan Parcels = {formatNumber(data.scan_parcels)}</p>
							<p>Customize Parcels = {formatNumber(data.cusomize_parcels)}</p>
							<p>Pickup Parcels = {formatNumber(data.pikup_parcel)}</p>
							<p>Delivery Parcels = {formatNumber(data.delivery_parcel)}</p>
						</TableCell>
					</TableRow>
				))}
		</>
	);

	return (
		<div className="flex flex-col space-y-6">
			<div className="flex items-center justify-between">
				<p className="text-2xl">Daily Report</p>
				<div className="w-[528px]">
					<Datepicker value={value} onChange={handleValueChange} />
				</div>
			</div>
			<TableComponent
				colSpan={2}
				header={"Customers"}
				data={customerBodyData}
			/>
			<TableComponent colSpan={2} header={"Income"} data={incomeBodyData} />
			<TableComponent colSpan={3} header={"Parcels"} data={parcelBodyData} />
		</div>
	);
};

export default DailyReport;
