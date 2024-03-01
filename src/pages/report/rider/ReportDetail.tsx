import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { counterOptions, customerHistoryRows } from "../../../layout/config";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";

const RiderReportDetail = () => {
  const [data, setData] = useState(customerHistoryRows.pickup);
  const [isdelivery, setIsdelivery] = useState(false);
  const [all, setAll] = useState(true);
  const [approved, setApproved] = useState(false);
  const [pending, setPending] = useState(false);
  const apiRef = useRef(null);
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };


  const amountColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "No",
      width: 105,
    },
    {
      field: "rider_id",
      headerName: "Rider ID",
      width: 207,
    },
    {
      field: "package",
      headerName: "Package Qty",
      width: 216,
    },
    {
      field: "amount",
      headerName: "Total Amount",
      width: 199,
    },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      renderCell: (params) => {
        return (
          <p className={params.row.status ==='Pending'?'text-red-1':'text-green'}>{params.row.status}</p>
        );
      },
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Detail",
      width: 111,
      headerAlign: "center",
      align:"center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/reports/riders/status/" + params.row.id}
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

  const activeButton = `buttonPrimary !px-4 !py-[10px]`
  const inactiveButton = `buttonOutlined !px-4 !py-[10px]`

  const pickUpHandler = ()=>{
    setData(customerHistoryRows.pickup);
    setIsdelivery(false);
  }

  const deliveryHandler = ()=>{
    setData(customerHistoryRows.delivery);
    setIsdelivery(true);
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold">Rider Report Detail</p>
          <p className="font-normal">9 Sep 2023 | Lashio_Branch_Counter1</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">
          Rider Report
          </p>{" "}
          <p className="py-2 px-4"> Report Detail</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={all?activeButton:inactiveButton} onClick={pickUpHandler}>All</div>
        <div className={approved?activeButton:inactiveButton} onClick={deliveryHandler}>Approved (8)</div>
        <div className={pending?activeButton:inactiveButton} onClick={deliveryHandler}>Pending (2)</div>
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

export default RiderReportDetail;
