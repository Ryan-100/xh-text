import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import {
  counterOptions,
  dailyReportSheet,
} from "../../../layout/config";
import {
  TableCell,
  TableRow,
} from "@mui/material";
import InputSelect from "../../../components/form/InputSelect";
import TableComponent from "../../../components/table/table";

const YearlyReport = () => {
  const [sheet, setSheet] = useState(dailyReportSheet);
  const { control } = useForm({ mode: "onChange" });

  const customerBodyData = (
    <>
      {sheet.customers.map((data,i) => (
        <TableRow key={i}>
          <TableCell colSpan={1} align="center">
            {data.key}
          </TableCell>
          <TableCell colSpan={1} align="center">
            {data.value}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
  
  const incomeLength = sheet.income.length
  const incomeBodyData = (
    <>
      {sheet.income.map((data, i) => (
        <TableRow key={i}>
          <TableCell  colSpan={1} align="center" sx={{color:i===incomeLength-1 &&'#FF6604'}}>
            {data.key}
          </TableCell>
          <TableCell colSpan={1} align="center" sx={{color:i===incomeLength-1 &&'#FF6604'}}>
            {data.value}
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  const parcelLength = sheet.parcel.length

  const parcelBodyData = (
    <>
      {sheet.parcel.map((data, i) => (
        <TableRow key={i}>
          <TableCell  colSpan={1} align="center" width={360} sx={{color:i===parcelLength-1 &&'#FF6604'}}>
            {data.key}
          </TableCell>
          <TableCell colSpan={1} align="center" width={360} sx={{color:i===parcelLength-1 &&'#FF6604'}}>
            {data.value1}
          </TableCell>
          <TableCell colSpan={1}  width={360} sx={{color:i===parcelLength-1 &&'#FF6604',paddingRight:'85px'}}>
            {data.value2}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
  

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl">Monthly Report</p>
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
      <TableComponent colSpan={2} header={"Customers"} data={customerBodyData} />
      <TableComponent colSpan={2} header={"Income"} data={incomeBodyData} />
      <TableComponent colSpan={3} header={"Parcels"} data={parcelBodyData} />
    </div>
  );
};

export default YearlyReport;
