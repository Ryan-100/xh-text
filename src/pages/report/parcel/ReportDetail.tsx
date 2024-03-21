import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import {
  counterOptions,
  parcelReportRows,
  incomeReportRows,
  incomeReportSheet,
} from "../../../layout/config";
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
import InputSelect from "../../../components/form/InputSelect";

const ParcelReportDetail = () => {
  const [data, setData] = useState(parcelReportRows);
  const [sheet, setSheet] = useState(incomeReportSheet.daily);
  const apiRef = useRef(null);
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const deliveryButton = `bg-primary text-white space-x-2 w-[104px] rounded-[4px] px-2 leading-[24px] flex items-center `
  const pickupButton = `bg-green text-white space-x-2 w-[104px] rounded-[4px] px-2 leading-[24px] flex items-center `

  const amountColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "No.",
      width: 53,
    },
    {
      field: "time",
      headerName: "Time",
      width: 115,
    },
    {
      field: "type",
      headerName: "Barcode / Parcel ID",
      width: 196,
      renderCell: (params) => {
        return (
          <>
            <div className="cellWithImg space-x-2">
              <Icon name={params.row.type} />
              <p className="MuiDataGrid-cellContent">{params.row.code}</p>
            </div>
          </>
        );
      },
    },
    {
      field: "scan_rider",
      headerName: "Scan Rider",
      width: 127,
    },
    {
      field: "user_id",
      headerName: "User ID",
      width: 134,
    },
    {
      field: "weight_amount",
      headerName: "Weight / Amount",
      width: 162,
    },
    {
      field: "status",
      headerName: "Pickup Amount",
      width: 130,
      renderCell:(params)=>{
        return <div className={params.row.status ==='Delivery'?deliveryButton:pickupButton}>
          <Icon name='2marks'/>
          <p className="text-white">
            {params.row.status ==='Delivery'?'Delivery':"Picked Up"}
            </p>
        </div>
      }
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 166,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/reports/parcels/detail/" + params.row.id}
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

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center ">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <div className="text-center">
          <p className="title">Parcel Report Detail</p>
          <p className="font-normal">Lashio_Branch_Counter1</p>
        </div>
        <div className="side-title  h-10">
          <p className="py-2 px-3 border-r border-r-gray text-gray">
          Parcel Report
          </p>{" "}
          <p className="py-2 px-3">Parcel Report Detail</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="w-[528px]">
          <InputSelect
            label={"10 Jan 2023 - 16 Jan 2024"}
            fullWidth
            name="region"
            control={control}
            options={counterOptions}
          />
        </div>
        <div className="w-[528px]">
          <InputSelect
            label={"10 Jan 2023 - 16 Jan 2024"}
            fullWidth
            name="region"
            control={control}
            options={counterOptions}
          />
        </div>
      </div>
      <Table
        sx={{
          ".MuiTableCell-head ": {
            backgroundColor: "#ECEDEF",
            fontSize: "20px",
          },
          "& .MuiTableCell-root": {
            borderLeft: "1px solid rgba(224, 224, 224, 1)",
          },
          "& .MuiTableCell-body": {
            fontSize: "16px",
          },

          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              Today - 1 Feb 2024
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sheet.map((data) => (
            <TableRow>
              <TableCell colSpan={1} align="center">
                {data.key}
              </TableCell>
              <TableCell colSpan={1} align="center">
                {data.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Datatable
        rows={data}
        columns={amountColumns.concat(actionColumn)}
        apiRef={apiRef}
      />
    </div>
  );
};

export default ParcelReportDetail;
