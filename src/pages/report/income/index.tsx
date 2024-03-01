import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import {  incomeReportRows,incomeReportSheet } from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import TableComponent from "../../../components/table/table";

const IncomeReport = () => {
  const [data, setData] = useState(incomeReportRows.daily);
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
      width: 257,
    },
    {
      field: "income",
      headerName: "Total Income",
      width: 193,
    },
    {
      field: "pickup",
      headerName: "Pickup Amount",
      width: 214,
    },
    {
      field: "delivery",
      headerName: "Delivery Amount",
      width: 205,
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
    setData(incomeReportRows.daily);
    setDaily(true);
    setMonthly(false);
    setYearly(false);
  };

  const monthlyHandler = () => {
    setData(incomeReportRows.monthly);
    setMonthly(true);
    setDaily(false);
    setYearly(false);
  };

  const yearlyHandler = () => {
    setData(incomeReportRows.yearly);
    setMonthly(false);
    setDaily(false);
    setYearly(true);
  };

  const tableBodyData = <>
  {sheet.map(data=>
  <TableRow>
    <TableCell colSpan={1} align="center">{data.key}</TableCell>
    <TableCell colSpan={1} align="center">{data.value}</TableCell>
  </TableRow>
    )}
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

export default IncomeReport;
