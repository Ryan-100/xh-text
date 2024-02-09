import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { counterReports } from "../../../layout/config";
import Button from "../../../components/form/Button";
import Datatable from "../../../components/table/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-multi-date-picker";

const CounterReport = () => {
  const [data, setData] = useState(counterReports);
  const apiRef = useRef(null);

  const parcelColumns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",

      width: 250,
    },
    { field: "scanned_customer", headerName: "Scanned Customer Qty", width: 250 },
    { field: "item", headerName: "Item Qty / Amount", width: 250 },
    { field: "delivered", headerName: "Delivered Qty / Amount", width: 250 },
    { field: "pick_up", headerName: "Pick Up Qty / Amount", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link className="viewButton" to={''+params.row.id}>
              Details
            </Link>
         
          </div>
        );
      },
    }
  ];

  return (
    <div className="p-2 md:p-5">
      <p className="font-bold text-lg">Counter Reports</p>
      <div className="w-full flex flex-col justify-center items-end md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2 p-2">
          <DatePicker
            value={new Date()}
            onlyMonthPicker
            sort
            style={{
              height: "24px",
              borderRadius: "8px",
              fontSize: "14px",
              padding: "16px 10px",
            }}
          />
          <Button>Filter</Button>
        </div>
      </div>
      <Datatable
        rows={data}
        columns={parcelColumns}
        apiRef={apiRef}
        editRowId={""}
        updateRow={() => {}}
      />
    </div>
  );
};

export default CounterReport;
