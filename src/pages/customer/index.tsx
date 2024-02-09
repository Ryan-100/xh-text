import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import Button from "../../components/form/Button";
import Datatable from "../../components/table/datatable";
import { customerRows } from "../../layout/config";

const CustomerLists = () => {
  const [data, setData] = useState(customerRows);
  const [editRowId, setEditRowId] = useState(null);
  const apiRef = useRef(null);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setEditRowId(id);
  };

  const handleSave = () => {
    setEditRowId(null);
    // Add logic to save the edited data (e.g., make an API call)
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    // Add logic to cancel the edit mode (if needed)
  };

  const handleButtonClick = () => {
    // Check if the apiRef is available
    if (apiRef.current && apiRef.current.api) {
      // Call the processRowModelUpdate method to update the rows
      apiRef.current.api.processRowModelUpdate();
    }
  };

  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    console.log(updatedRow, originalRow, "rows");
    handleSave();
    return updatedRow;
  };
  const customerColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 70 },
    {
      field: "id",
      headerName: "Cus No.",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Customer",
      width: 150,

      editable: true,
      renderCell: (params) => {
        return (
          <>
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img} alt="avatar" />
              {params.row.name}
            </div>
          </>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone No.",
      width: 200,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "city", headerName: "City", width: 130, editable: true },
    { field: "region", headerName: "Region", width: 130, editable: true },
  ];

  const actionColumn: GridColDef[] = [
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

            <Link className="editButton" to={"edit/" + params.row.id}>
              Edit
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-2 md:p-5">
      <div className="w-full flex flex-col justify-center items-end md:flex-row md:items-center md:justify-between">
        <Link to="/customers/create">
          <Button>+ Add customer</Button>
        </Link>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          sx={{ marginY: "1em" }}
        />
      </div>
      <Datatable
        rows={data}
        columns={customerColumns.concat(actionColumn)}
        apiRef={apiRef}
        editRowId={editRowId}
        updateRow={handleProcessRowUpdate}
      />
    </div>
  );
};

export default CustomerLists;
