import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
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
          <p className="title">Parcel Report Detail</p>
          <p className="font-normal">Lashio_Branch_Counter1</p>
        </div>
        <div className="side-title  h-10">
          <p className="py-2 px-3 border-r border-r-gray text-gray">
            Parcel Report
          </p>{" "}
          <p className="py-2 px-3">Parcel Report Detail</p>
        </div>
      </div>
      <div className="bg-white rounded-[10px]">
        <Table
          sx={{
            ".MuiTableCell-head ": {
              width:'200%',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiTableCell-root": {
              borderLeft: "1px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiTableCell-body": {
              fontSize: "16px",
            },

            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <img
                  src="/parcel.png"
                  alt="parcel"
                  className="w-[360px] h-[360px] my-4"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell width={490}>
                <div className="flex items-center space-x-4">
                  <Icon name="barcode" color="#FF6604" />
                  <p className="">Parcel Barcode</p>
                </div>
              </TableCell>
              <TableCell width={590}>{data.barcode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={490}>
                <div className="flex items-center space-x-4">
                  <Icon name="charges" color="#FF6604" />
                  <p className="">Charges</p>
                </div>
              </TableCell>
              <TableCell width={590}>{data.charges}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={490}>
                <div className="flex items-center space-x-4">
                  <Icon name="user" color="#FF6604" />
                  <p className="">User ID</p>
                </div>
              </TableCell>
              <TableCell width={590}>{data.user_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={490}>
                <div className="flex items-center space-x-4">
                  <Icon name="parcel" color="#FF6604" />
                  <p className="">Parcel Type</p>
                </div>
              </TableCell>
              <TableCell width={590}>{data.parcel_type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={490}>
                <div className="flex items-center space-x-4">
                  <Icon name="weight" color="#FF6604" />
                  <p className="">Weight</p>
                </div>
              </TableCell>
              <TableCell width={590}>{data.weight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={490}>
                <div className="flex items-center space-x-4">
                  <Icon name="calendar" color="#FF6604" />
                  <p className="">Scanned Date</p>
                </div>
              </TableCell>
              <TableCell width={590}>{data.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={490}>
                <div className="flex items-center space-x-4">
                  <Icon name="people" color="#FF6604" />
                  <p className="">Scanned Rider</p>
                </div>
              </TableCell>
              <TableCell width={590}>{data.rider}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={490}>
                <div className="flex items-center space-x-4">
                  <Icon name="delivery" color="#FF6604" />
                  <p className="">Delivery Status</p>
                </div>
              </TableCell>
              <TableCell width={590}>{data.status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ParcelReportDetail;
