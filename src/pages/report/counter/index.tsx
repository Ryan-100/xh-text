import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import {  counterReportRows,incomeReportSheet } from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { Divider, TableCell, TableRow } from "@mui/material";
import TableComponent from "../../../components/table/table";

const CounterReport = () => {
  const [data, setData] = useState(counterReportRows.daily);
  const [sheet, setSheet] = useState(incomeReportSheet.daily)
  const [daily, setDaily] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const apiRef = useRef(null);
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const amountColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "No.",
      width: 92,
    },
    {
      field: "counter",
      headerName: "Counter",
      width: 287,
    },
    {
      field: "parcels",
      headerName: "Scanned Parcels",
      width: 250,
    },
    {
      field: "income",
      headerName: "Total Income",
      width: 301,
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/reports/counters/" + params.row.id}
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
    setData(counterReportRows.daily);
    setDaily(true);
    setMonthly(false);
    setYearly(false);
  };

  const monthlyHandler = () => {
    setData(counterReportRows.monthly);
    setMonthly(true);
    setDaily(false);
    setYearly(false);
  };

  const yearlyHandler = () => {
    setData(counterReportRows.yearly);
    setMonthly(false);
    setDaily(false);
    setYearly(true);
  };

  const tableBodyData = <>
  <TableRow>
    <TableCell colSpan={1} align="center">Scanned Parcels</TableCell>
    <TableCell colSpan={1} align="center">50,000,000</TableCell>
  </TableRow>
  <TableRow>
    <TableCell colSpan={1} align="center">Total Income</TableCell>
    <TableCell colSpan={1} align="center">200,000,000 Ks</TableCell>
  </TableRow>
</>
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
      <TableComponent colSpan={2} header={"Today - 1 Feb 2024"} data={tableBodyData} />

      <Datatable
        rows={data}
        columns={amountColumns.concat(actionColumn)}
        apiRef={apiRef}
      />
    </div>
  );
};

export default CounterReport;
