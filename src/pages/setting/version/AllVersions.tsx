import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { versionRows } from "../../../layout/config";
import Button from "../../../components/form/Button";
import Datatable from "../../../components/table/datatable";
import Modal from "../../../components/Modal";
import { Link } from "react-router-dom";

const AllVersions = () => {
  const [data, setData] = useState(versionRows);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditRow, setIsEditRow] = useState(false);
  const apiRef = useRef(null);


  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    console.log(updatedRow, originalRow, "rows");
    handleSave();
    return updatedRow;
  };

  const handleUpdateChange = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, update: !item.update } : item
      )
    );
  };


  const versionColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 70 },
    {
      field: "os",
      headerName: "OS Type",
      align: "center",
      headerAlign: "center",
      width: 180,
    },
    {
      field: "app",
      headerName: "App name",
      align: "center",
      headerAlign: "center",
      width: 180,
    },
    {
      field: "link",
      headerName: "Link",
      align: "center",
      headerAlign: "center",
      width: 230,
      renderCell: (params) => {
        return <a target="_blank" className="text-emerald-800 hover:underline" href={params.row.link}>{params.row.link}</a>;
      },
    },
    {
      field: "version",
      headerName: "Current Version",
      align: "center",
      headerAlign: "center",
      width: 180,
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "update",
      headerName: "Force Update",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const updateText = params.row.update ? "On" : "Off";
        return (
          <div className={`${updateText === "On" ? "onButton" : "offButton"}`}>
            <button onClick={() => handleToggleSwitch(params.row.id)}>
              {updateText}
            </button>
          </div>
        );
      },
    },
  
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </div>
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

  const handleEdit = (id) => {
    setEditRowId(id);

    // Find the corresponding row data for the given id
    const selectedRow = data.find((row) => row.id === id);

    // Set the edited data in the state
    setEditedData(selectedRow);

    // Open the modal
    setIsEditRow(true);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    // Update the data with the edited data
    const newData = data.map((row) => (row.id === editRowId ? editedData : row));
    setData(newData);

    // Close the modal and reset edit states
    setIsModalOpen(false);
    setIsEditRow(false);
    setEditRowId(null);
    setEditedData(null);
  };

  const handleCancelEdit = () => {
    // Close the modal and reset edit states
    setIsEditRow(false);
    setIsModalOpen(false);
    setEditRowId(null);
    setEditedData(null);
  };

  const handleToggleSwitch = (id) => {
    setEditRowId(id);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    // Implement your logic to handle the switch state change
    handleUpdateChange(editRowId);
    // Close the modal
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // Reset state without saving changes
    setIsModalOpen(false);
    setIsEditRow(false);
    setEditRowId(null);
  };
  return (
    <>
    <div className="p-2 md:p-5 w-full  flex flex-col space-y-6">
      <div className="self-end">
      <Link to="create">
          <Button>+ Create</Button>
        </Link>
      </div>
      <Datatable
        title="Version Information"
        rows={data}
        columns={versionColumns.concat(actionColumn)}
        apiRef={apiRef}
        editRowId={editRowId}
        updateRow={handleProcessRowUpdate}
      />
    </div>
    <Modal
        open={iseditRow || isModalOpen}
        onClose={handleCancelEdit}
        title={isModalOpen?"Confirm Switch State":"Edit Version Updates"}

      >
        {editedData && (
          <>
            <TextField
              variant="standard"
              label="OS Type"
              value={editedData.os}
              onChange={(e) => setEditedData({ ...editedData, os: e.target.value })}
            />
            <TextField
              variant="standard"
              label="App name"
              value={editedData.app}
              onChange={(e) => setEditedData({ ...editedData, os: e.target.value })}
            />
            <TextField
              variant="standard"
              label="Link"
              value={editedData.link}
              onChange={(e) => setEditedData({ ...editedData, link: e.target.value })}
            />
            <TextField
              variant="standard"
              label="Current Version"
              value={editedData.version}
              onChange={(e) => setEditedData({ ...editedData, version: e.target.value })}
            />
            <div className="flex justify-between">
              <p>Force Update : </p>
              <button
                className={`${editedData.update ? "onButton" : "offButton"}`}
                onClick={() =>  setEditedData((prevData) => ({
                  ...prevData,
                  update: !prevData.update,
                }))}
                >
                {editedData.update ? "On" : "Off"}
              </button>
            </div>
            <div className="flex justify-end space-x-2">
              <div className="deleteButton" onClick={handleCancelEdit}>
                Cancel
              </div>
              <div className="editButton" onClick={handleSave}>
                Save
              </div>
            </div>
            {/* Add more fields as needed */}
          </>
        )}
        {
          isModalOpen && <> <p>Are you sure you want to change the switch state?</p>
          <div className="flex justify-end space-x-2">
            <div className="deleteButton" onClick={handleCancel}>
              Cancel
            </div>
            <div className="editButton" onClick={handleModalConfirm}>
              Confirm
            </div>
          </div></>
        }
      </Modal>
    
    </>
  );
};

export default AllVersions;
