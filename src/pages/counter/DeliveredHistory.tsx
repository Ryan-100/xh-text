import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import Icon from "../../icons";
import InputSelect from "../../components/form/InputSelect";
import { counterOptions, historyRows } from "../../layout/config";
import Datatable from "../../components/table/datatable";

const ProfileEditComponent = () => {
  const [data, setData] = useState(historyRows);
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
      field: "date",
      headerName: "Date",
      width: 194,
    },
    {
      field: "cus_id",
      headerName: "Customer ID",
      width: 174,
    },
    {
      field: "package_id",
      headerName: "Package ID",
      width: 157,
    },
    {
      field: "item_amount",
      headerName: "Item Qty/Amount",
      width: 187,
    },
    {
      field: "counter",
      headerName: "Counter Name",
      width: 214,
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 138,
      headerAlign: "center",
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
        <p className="title">Delivered History</p>
        <div className="side-title  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">
            Rider Detail
          </p>{" "}
          <p className="py-2 px-4">History</p>
        </div>
      </div>
      <div className="w-[528px] self-end">
        <InputSelect
          label={"10 Jan 2023 - 16 Jan 2024"}
          fullWidth
          name="region"
          control={control}
          options={counterOptions}
        />
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
