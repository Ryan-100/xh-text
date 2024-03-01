import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { roleOptions } from "../../../layout/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const RiderReportDetail = () => {
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const versionHistory = [
    {
      id: 1,
      date: "11 Sep 2023, 11:00:00 AM",
      application: "User Application",
      version: "Ver 3.2.1",
      link: "www.link.com",
      created_by: "SuperAdmin_HHW",
    },
    {
      id: 12,
      date: "11 Sep 2023, 11:00:00 AM",
      application: "User Application",
      version: "Ver 3.2.1",
      link: "www.link.com",
      created_by: "SuperAdmin_HHW",
    },
    {
      id: 13,
      date: "11 Sep 2023, 11:00:00 AM",
      application: "User Application",
      version: "Ver 3.2.1",
      link: "www.link.com",
      created_by: "SuperAdmin_HHW",
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
          <p className="text-2xl font-semibold">Application Version History</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">
            Application Version
          </p>
          <p className="py-2 px-2">Version History</p>
        </div>
      </div>

      <div className="flex flex-col space-y-1 w-[344px]">
        <p className="text-base">Filter By Application</p>
        <div className="w-[344px]">
          <InputSelect
            fullWidth
            name="role"
            control={control}
            label={""}
            options={roleOptions}
          />
        </div>
      </div>
      <Table
        sx={{
          ".MuiTableCell-head ": {
            backgroundColor: "#ECEDEF",
            fontSize: "20px",
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
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Application</TableCell>
            <TableCell align="center">Version</TableCell>
            <TableCell align="center">Version Link</TableCell>
            <TableCell align="center">Created By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {versionHistory.map((data) => (
            <TableRow>
              <TableCell align="center">{data.date}</TableCell>
              <TableCell align="center">{data.application}</TableCell>
              <TableCell align="center">{data.version}</TableCell>
              <TableCell align="center">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="copylink" />
                  <p className="text-primary">Copy Link</p>
                </div>
              </TableCell>
              <TableCell align="center">{data.created_by}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RiderReportDetail;
