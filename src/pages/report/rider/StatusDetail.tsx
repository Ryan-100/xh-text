import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { parcelDetail } from "../../../layout/config";

const ParcelReportDetail = () => {
  const [data, setData] = useState(parcelDetail);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

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
          <p className="title">Approved Report Detail</p>
        </div>
        <div className="side-title  h-10">
          <p className="py-2 px-3 border-r border-r-gray text-gray">
            Rider Report
          </p>{" "}
          <p className="py-2 px-3">Report Detail</p>
        </div>
      </div>
      <div className="bg-white rounded-[10px]">
        <Table
          sx={{
            ".MuiTableCell-head ": {
              width: "200%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiTableCell-root": {
              borderLeft: "1px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiTableCell-body": {
              fontSize: "16px",
              padding: "24px",
            },

            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell width={344}>
                <p className="">Date</p>
              </TableCell>
              <TableCell width={736}>{data.barcode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={344}>
                <p className="">Rider ID</p>
              </TableCell>
              <TableCell width={736}>{data.charges}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={344}>
                <p className="">Package Qty</p>
              </TableCell>
              <TableCell width={736}>
                <div className="w-full flex items-center justify-between">
                  <p className="">{data.user_id}</p>
                  <Link
                    to={"/reports/riders/packages-date/1"}
                    className="buttonPrimary space-x-2 h-10"
                  >
                    <Icon name="details" />
                    <span>Detail</span>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={344}>
                <p className="">Online Payment Amount</p>
              </TableCell>
              <TableCell width={736}>{data.parcel_type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={344}>
                <p className="">Cash Amount</p>
              </TableCell>
              <TableCell width={736}>{data.weight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={344}>
                <p className="">Total Amount</p>
              </TableCell>
              <TableCell width={736}>{data.date}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ParcelReportDetail;
