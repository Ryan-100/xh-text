import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { parcelReports } from "../../../layout/config";
import Button from "../../../components/form/Button";
import Datatable from "../../../components/table/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-multi-date-picker";

const ParcelReport = () => {
  const [data, setData] = useState(parcelReports);
  const apiRef = useRef(null);

  const parcelColumns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",

      width: 250,
    },
    { field: "arrive_jiegao", headerName: "Arrive Jiegao", width: 150 },
    { field: "arrive_lasio", headerName: "Arrive Lasio", width: 150 },
    { field: "take_lasio", headerName: "Take Away Lasio", width: 150 },
    { field: "arrive_laukkai", headerName: "Arrive Laukkai", width: 150 },
    { field: "take_laukkai", headerName: "Take Away Laukkai", width: 150 },
    { field: "arrive_muse", headerName: "Arrive Muse", width: 150 },
    { field: "take_muse", headerName: "Take Away Muse", width: 150 },
  ];

  return (
    <div className="p-2 md:p-5">
      <p className="font-bold text-lg">Parcel Reports</p>
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

export default ParcelReport;
