import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import Button from "../../components/form/Button";
import Datatable from "../../components/table/datatable";
import { GridColDef } from "@mui/x-data-grid";
import { riderRows } from "../../layout/config";
import Icon from "../../icons";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";

const RiderList = () => {
  const [data, setData] = useState(riderRows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const apiRef = useRef(null);

  const handleDelete = (id) => {
    setIsDelete(true);
    setEditRowId(id)
  };

  const handleEdit = (id) => {
    setEditRowId(id);
  };

  // const handleButtonClick = () => {
  //   // Check if the apiRef is available
  //   if (apiRef.current && apiRef.current.api) {
  //     // Call the processRowModelUpdate method to update the rows
  //     apiRef.current.api.processRowModelUpdate();
  //   }
  // };

  const handleUpdateChange = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, switch: !item.switch } : item
      )
    );
  };
  const handleToggleSwitch = (id) => {
    setEditRowId(id);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Update the data with the edited data
    if(isModalOpen){
      handleUpdateChange(editRowId)
    }
    if(isDelete){
    setData(data.filter((item) => item.id !== editRowId));

    }
    // Close the modal and reset edit states
    setIsModalOpen(false);
    setIsDelete(false);
    setEditRowId(null);
  };
  
  const handleCancelEdit = () => {
    // Close the modal and reset edit states
    setIsDelete(false);
    setIsModalOpen(false);
    setEditRowId(null);
    setIsDelete(false);
  };

  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    console.log(updatedRow, originalRow, "rows");
    handleSave();
    return updatedRow;
  };
  const userColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 70 },
    {
      field: "name",
      headerName: "Rider",
      width: 230,
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
    { field: "phone", headerName: "Phone No..", width: 230 },
    { field: "city", headerName: "City", width: 200 },
    { field: "counter", headerName: "Counter Name", width: 200 },
    { field: "createdAt", headerName: "Register Date", width: 100 },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      width: 300,
      renderCell: (params) => {
        const switchText = params.row.switch ? "On" : "Off";
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleEdit(params.row.id)}
            >
              Details
            </div>
            <div
              className={`${switchText === "On" ? "onButton" : "offButton"}`}
            >
              <button onClick={() => handleToggleSwitch(params.row.id)}>
                <Icon name="bicycle" />
              </button>
            </div>

            <Link
              className="editButton"
              to={`edit/${params.row.id}`}
            >
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
    <>
      <div className="p-2 md:p-5">
        <div className="w-full flex flex-col justify-center items-end md:flex-row md:items-center md:justify-between">
          <Link to='create'>
          <Button>+ Add Rider</Button>
          </Link>
          <TextField
            id="standard-basic"
            label="Search admin"
            variant="standard"
          />
        </div>
        <Datatable
          rows={data}
          columns={userColumns.concat(actionColumn)}
          apiRef={apiRef}
          editRowId={editRowId}
          updateRow={handleProcessRowUpdate}
        />
      </div>
         </>
  );
};

export default RiderList;
