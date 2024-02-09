import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { paymentRows } from "../../../layout/config";
import Button from "../../../components/form/Button";
import Datatable from "../../../components/table/datatable";
import Modal from "../../../components/Modal";
import { Link } from "react-router-dom";

const PaymentMethod = () => {
  const [android, setAndroid] = useState(paymentRows);
  const [iconImage, setIconImage] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [iseditRow, setIsEditRow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const apiRef = useRef(null);

  const handleDelete = (id) => {
    // Use the selectedTable state to determine which table to update
    if (selectedTable === "android") {
      setAndroid((prevAndroid) => prevAndroid.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (id, table) => {
    setEditRowId(id);
    setIsEditRow(true);
    setSelectedTable(table);

    // Find the selected row data based on the selected table
    const selectedRowData = android.find((item) => item.id === id);

    setSelectedRow(selectedRowData);
  };

  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    console.log(updatedRow, originalRow, "rows");
    return updatedRow;
  };

  const handleSwitchChange = (id) => {
    setAndroid((prevAndroid) =>
      prevAndroid.map((item) =>
        item.id === id ? { ...item, switch: !item.switch } : item
      )
    );
  };

  const handleToggleSwitch = (id) => {
    setEditRowId(id);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    // Implement your logic to handle the switch state change
    handleSwitchChange(editRowId);
    // Close the modal
    setIsModalOpen(false);
  };

  const androidColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "No.",
      width: 70,
    },
    {
      field: "method",
      headerName: "Method Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "city",
      headerName: "City",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "icon",
      headerName: "Icon",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <img className="w-10 h-10" src={params.row.icon} />;
      },
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "switch",
      headerName: "On/Off",
      width: 230,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const switchText = params.row.switch ? "On" : "Off";
        return (
          <div className={`${switchText === "On" ? "onButton" : "offButton"}`}>
            <button onClick={() => handleToggleSwitch(params.row.id)}>
              {switchText}
            </button>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id, "android")}
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

  const handleSaveChanges = (editedData) => {
    // Update the corresponding row in the selected table
    if (selectedTable === "android") {
      setAndroid((prevAndroid) =>
        prevAndroid.map((item) =>
          item.id === editRowId ? { ...item, ...editedData } : item
        )
      );
    } else if (selectedTable === "ios") {
    }

    // Reset state after saving changes
    setIsModalOpen(false);
    setEditRowId(null);
    setSelectedRow(null);
    setSelectedTable(null);
    setIsEditRow(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditRowId(null);
    setIsEditRow(false);
  };
  const handleCancel = () => {
    // Reset state without saving changes
    setIsModalOpen(false);
    setIsEditRow(false);
    setEditRowId(null);
    setSelectedRow(null);
    setSelectedTable(null);
  };

  const handleSave = () => {
    // Call the handleSaveChanges function to save changes
    handleSaveChanges(selectedRow);
  };

  const uploadIconImage = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setIconImage(e.target.result.toString());
        }
      };
      // setOpenSuccessModal(true);
    }
  };
  console.log(selectedRow, "selected row");
  return (
    <>
      <div className="p-2 md:p-5 w-full flex flex-col">
        <div className="self-end">
          <Link to="create">
            <Button>+ Create</Button>
          </Link>
        </div>
        <Datatable
          title="Payment Method"
          rows={android}
          columns={androidColumns.concat(actionColumn)}
          apiRef={apiRef}
          editRowId={editRowId}
          updateRow={handleProcessRowUpdate}
        />
      </div>
      <Modal
        open={iseditRow || isModalOpen}
        onClose={handleModalClose}
        title={isModalOpen ? "Confirm Switch State" : "Edit Payment Type"}
      >
        {selectedRow && (
          <>
            {/* Display the fields you want to edit in the modal */}
            <div className="flex items-center justify-center w-full">
              <div className="w-1/2">
                <img
                  className="w-16 h-16  object-contain border"
                  src={iconImage ? iconImage : "/icon.png"}
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="file-input"
                  className=" border border-1 p-1 rounded-md cursor-pointer"
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".png"
                    onChange={uploadIconImage}
                    hidden
                  />
                  Choose icon
                </label>
              </div>
            </div>
            <div className="flex items-end space-x-3">
              <TextField
                label="Method Name"
                variant="standard"
                fullWidth
                value={selectedRow.method}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, method: e.target.value })
                }
              />
              {selectedTable === "android" && (
                <button
                  className={`${selectedRow.switch ? "onButton" : "offButton"}`}
                  onClick={() =>
                    setSelectedRow((prevData) => ({
                      ...prevData,
                      switch: !prevData.switch,
                    }))
                  }
                >
                  {selectedRow.switch ? "On" : "Off"}
                </button>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <div className="deleteButton" onClick={handleCancel}>
                Cancel
              </div>
              <div className="editButton" onClick={handleSave}>
                Save
              </div>
            </div>
            {/* Add more fields as needed */}
          </>
        )}
        {isModalOpen && (
          <>
            {" "}
            <p>Are you sure you want to change the switch state?</p>
            <div className="flex justify-end space-x-2">
              <div className="deleteButton" onClick={handleCancel}>
                Cancel
              </div>
              <div className="editButton" onClick={handleModalConfirm}>
                Confirm
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default PaymentMethod;
