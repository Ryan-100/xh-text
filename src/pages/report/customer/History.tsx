import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { counterOptions, customerHistoryRows } from "../../../layout/config";
import InputSelect from "../../../components/form/InputSelect";
import Datatable from "../../../components/table/datatable";
import Icon from "../../../icons";

const ProfileEditComponent = () => {
  const [data, setData] = useState(customerHistoryRows.pickup);
  const [isdelivery, setIsdelivery] = useState(false);
  const apiRef = useRef(null);
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const amountColumns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 300,
    },
    {
      field: "package_id",
      headerName: "Package ID",
      width: 189,
    },
    {
      field: "parcel",
      headerName: "No. of Parcels",
      width: 210,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 240,
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 111,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/counters/delivered-history/package/" + params.row.id}
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

  const activeButton = `buttonPrimary !px-4 !py-[10px]`;
  const inactiveButton = `buttonOutlined !px-4 !py-[10px]`;

  const pickUpHandler = () => {
    setData(customerHistoryRows.pickup);
    setIsdelivery(false);
  };

  const deliveryHandler = () => {
    setData(customerHistoryRows.delivery);
    setIsdelivery(true);
  };
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
          <p className="title">Order History Of Customer</p>
          <p className="font-normal">Customer ID : LABAER012345</p>
        </div>
        <div className="side-title  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">
            Customer Detail
          </p>
          <p className="py-2 px-4">History</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={isdelivery ? inactiveButton : activeButton}
            onClick={pickUpHandler}
          >
            Pickup History
          </div>
          <div
            className={isdelivery ? activeButton : inactiveButton}
            onClick={deliveryHandler}
          >
            Delivery History
          </div>
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

export default ProfileEditComponent;
