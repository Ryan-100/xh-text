import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import {
  counterOptions,
  counterReportDetailRows,
} from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import InputSelect from "../../../components/form/InputSelect";

const ParcelReportDetail = () => {
  const [data, setData] = useState(counterReportDetailRows);
  const apiRef = useRef(null);
  const { control } = useForm({ mode: "onChange" });



  const amountColumns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 164,
    },
    {
      field: "counter",
      headerName: "Counter Name",
      width: 217,
    },
    {
      field: "rider",
      headerName: "Rider Qty",
      width: 174,
    },
    {
      field: "package",
      headerName: "Package Qty",
      width: 199,
    },
    {
      field: "amount",
      headerName: "Total Amount",
      width: 199,
          },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/reports/riders/" + params.row.id}
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

export default ParcelReportDetail;
