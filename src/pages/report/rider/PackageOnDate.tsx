import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import {

  counterReportDetailRows,
} from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";


const RiderPackageOnDate = () => {
  const [data, setData] = useState(counterReportDetailRows);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const amountColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "No.",
      width: 78,
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
      headerName: "Payment Type",
      width: 215,
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
              to={"/reports/riders/packages/" + params.row.id }
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
      <div className="flex justify-between items-center ">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <div className="text-center">
          <p className="title">Packages on 9 Sep 2023</p>
        </div>
        <div className="side-title  h-10">
          <p className="py-2 px-3 border-r border-r-gray text-gray">
          Rider Report
          </p>{" "}
          <p className="py-2 px-3"> Report Detail</p>
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

export default RiderPackageOnDate;
