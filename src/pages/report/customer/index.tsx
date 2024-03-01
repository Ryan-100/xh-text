import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import {
  counterOptions,
  counterReportDetailRows,
} from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { TableCell, TableRow } from "@mui/material";
import InputSelect from "../../../components/form/InputSelect";
import TableComponent from "../../../components/table/table";

const CustomerReports = () => {
  const [data, setData] = useState(counterReportDetailRows);
  const apiRef = useRef(null);
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const deliveryButton = `bg-primary text-white space-x-2 w-[104px] rounded-[4px] px-2 leading-[24px] flex items-center `;
  const pickupButton = `bg-green text-white space-x-2 w-[104px] rounded-[4px] px-2 leading-[24px] flex items-center `;

  const amountColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "No.",
      width: 105,
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 191,
      renderCell: (params) => {
        return (
          <>
            <div className="cellWithImg">
              <img className="cellImg" src={'/parcel.png'} alt="avatar" />
              <p className="MuiDataGrid-cellContent">{params.row.username}</p>
            </div>
          </>
        );
      },
    },
    {
      field: "customer_id",
      headerName: "Customer ID",
      width: 191,
    },

    {
      field: "item_amount",
      headerName: "Package Qty/Amount",
      width: 224,
    },
    {
      field: "status",
      headerName: "Status",
      width: 215,
      
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 126,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/reports/customers/" + params.row.id}
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
          <p className="text-2xl font-semibold">Counter Report Detail</p>
          <p className="font-normal">Lashio_Branch_Counter1</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-3 border-r border-r-gray text-gray">
            Counter Report
          </p>{" "}
          <p className="py-2 px-3">Counter Daily Report</p>
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
      <Datatable
        rows={data}
        columns={amountColumns.concat(actionColumn)}
        apiRef={apiRef}
      />
    </div>
  );
};

export default CustomerReports;
