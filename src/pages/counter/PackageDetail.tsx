import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import Icon from "../../icons";
import { packageRows } from "../../layout/config";
import Datatable from "../../components/table/datatable";
import { Divider } from "@mui/material";

const ProfileEditComponent = () => {
  const [data, setData] = useState(packageRows);
  const [editRowId, setEditRowId] = useState(null);
  const apiRef = useRef(null);
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    console.log(updatedRow, originalRow, "rows");
    return updatedRow;
  };

  const amountColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "No",
      width: 162,
    },
    {
      field: "type",
      headerName: "Barcode / Parcel ID",
      width: 262,
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
      field: "parcel_type",
      headerName: "Parcel Type",
      width: 236,
    },
    {
      field: "kg_amount",
      headerName: "Kg | Amount",
      width: 211,
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Package Images",
      width: 199,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"package/" + params.row.id}
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
          <p className="title">Package Detail</p>
          <p className="font-normal">Customer ID : LABAER012345</p>
        </div>
        <div className="side-title  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">
            Delivered History
          </p>{" "}
          <p className="py-2 px-4">Package Detail</p>
        </div>
      </div>

      <div className="flex space-x-6">
        <div className="bg-white rounded-[10px] p-6 flex-1">
          <p className="font-normal mb-4">
            <span className="text-gray">Received by Customer :</span>9 Sep 2023,
            11:00:00 AM
          </p>
          <Divider />
          <div className="space-y-4 mt-4">
            <div className="flex space-x-4">
              <Icon name="parcel" />
              <p className="text-primary font-normal">20</p>
            </div>
            <div className="flex space-x-4">
              <Icon name="id" />
              <p className="text-xl font-semibold">LAB112345678</p>
            </div>
            <div className="flex space-x-4">
              <Icon name="price" />
              <p className="">40,000 Ks</p>
            </div>
            <div className="h-[1px] w-[348px] bg-slate-500" />
            <div className="flex space-x-4">
              <Icon name="location1" />
              <div className="space-y-2">
                <p className="">Pickup Location</p>
                <p className="text-gray">
                  Lashio, Thiri Mahar Quarter, Station Street, Near Lashio
                  University No(1)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[10px] p-6 flex-1">
          <p className="font-normal mb-4">Payment Invoice</p>
          <Divider />
          <div className="space-y-4">
            <div className="grid grid-cols-3 mt-4">
              <p className="col-span-1 text-gray">Delivery Name</p>
              <p className="col-span-2">Mg Kyi Thar (Rider ID : LA01Kyaw)</p>
            </div>
            <div className="grid grid-cols-3 mt-4">
              <p className="col-span-1 text-gray">Counter</p>
              <p className="col-span-2">Lashio, Branch 1</p>
            </div>
            <div className="grid grid-cols-3 mt-4">
              <p className="col-span-1 text-gray">Delivery's Note</p>
              <p className="col-span-2">Payment received, thank you</p>
            </div>
            <div className="grid grid-cols-3 mt-4">
              <p className="col-span-1 text-gray">Payment</p>
              <p className="col-span-2">
                KBZ Pay{" "}
                <span className="text-primary ml-4">
                  View Transaction Image
                </span>
              </p>
            </div>
            <div className="grid grid-cols-3 mt-4 items-center">
              <p className="col-span-1 text-gray">Receiver's Sign</p>
              <div className="col-span-2">
                <div className="w-[68px] h-[68px] rounded-[10px] bg-gray-light relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      width="40"
                      height="30"
                      viewBox="0 0 40 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.875 19.0907C5.02903 12.924 12.9916 2.99918 11.6097 12.6342C9.88226 24.6781 11.9798 32.997 18.0258 19.0907C21.5194 11.0552 20.6313 9.27281 18.9698 9.58881C17.4646 9.87506 16.5434 11.3511 15.9463 12.7621C13.3378 18.9259 11.0872 28.4241 18.0258 29.3963C27.7734 30.7621 38.5081 5.55699 35.6702 1.33544C32.8323 -2.88611 21.604 10.8959 28.6371 19.0907C32.5818 23.687 34.4523 22.6115 35.218 20.4168C35.5399 19.4942 34.4191 19.0798 33.8459 19.8712V19.8712C33.1802 20.7904 35.0197 22 35.6966 22.9109C35.9275 23.2216 35.9517 23.7811 35.6702 24.6781C34.8414 27.319 34.0851 27.0343 33.5788 26.0864C33.1111 25.2107 33.1678 24.1413 33.8566 23.4261C34.684 22.567 36.2777 21.3972 39.125 20.084"
                        stroke="#444240"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
