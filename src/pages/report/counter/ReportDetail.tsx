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

const ParcelReportDetail = () => {
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
      field: "customer_id",
      headerName: "Customer ID",
      width: 191,
    },
    {
      field: "package_id",
      headerName: "Package ID",
      width: 215,
    },
    {
      field: "item_amount",
      headerName: "Item Qty/Amount",
      width: 224,
    },
    {
      field: "status",
      headerName: "Delivery Status",
      width: 215,
      renderCell: (params) => {
        return (
          <div
            className={
              params.row.status === "Delivery" ? deliveryButton : pickupButton
            }
          >
            <Icon name="2marks" />
            <p className="text-white">
              {params.row.status === "Delivery" ? "Delivery" : "Picked Up"}
            </p>
          </div>
        );
      },
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Invoice",
      width: 126,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/reports/counters/" + params.row.id+"/invoice"}
              className="buttonPrimary space-x-2 h-10"
            >
              <Icon name="view" />
              <span>View</span>
            </Link>
          </div>
        );
      },
    },
  ];

  const bodyData = (
    <>
      <TableRow>
        <TableCell colSpan={1} align="center">
          Scanned Packages
        </TableCell>
        <TableCell colSpan={1} align="center">
          1000
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={1} align="center">
          Scanned Packages
        </TableCell>
        <TableCell colSpan={1} align="center">
          100,000 Ks
        </TableCell>
      </TableRow>
    </>
  );

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

      <TableComponent
        colSpan={2}
        header={"Today - 1 Feb 2024"}
        data={bodyData}
      />
      <Datatable
        rows={data}
        columns={amountColumns.concat(actionColumn)}
        apiRef={apiRef}
      />
    </div>
  );
};

export default ParcelReportDetail;
