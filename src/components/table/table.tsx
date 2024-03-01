import React from "react";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface TableProps {
  header: string;
  data: any;
  colSpan:number;
}

const TableComponent: React.FC<TableProps> = ({ header, data,colSpan }) => {
  return (
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
          <TableCell align="center" colSpan={colSpan}>
            {header}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
