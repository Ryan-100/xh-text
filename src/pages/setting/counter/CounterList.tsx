import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { counterOptions, counterRows } from "../../../layout/config";
import Button from "../../../components/form/Button";
import Datatable from "../../../components/table/datatable";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal";
import InputSelect from "../../../components/form/InputSelect";
import MUIinput from "../../../components/form/MUIinput";
import { useForm } from "react-hook-form";

const CounterList = () => {
  const [data, setData] = useState(counterRows);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiRef = useRef(null);

  const { control, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      // Specify your default values here
      counter: editedData?.counter,
      city: editedData?.city,
      block: editedData?.block,
      region: editedData?.region,
    },
  });

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setEditRowId(id);

    // Find the corresponding row data for the given id
    const selectedRow = data.find((row) => row.id === id);

    // Set the edited data in the state
    setValue("counter", selectedRow.counter);
    setValue("city", selectedRow.city);
    setValue("block", selectedRow.block);
    setValue("region", selectedRow.region);
    setEditedData(selectedRow);

    // Open the modal
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Update the data with the edited data
    const newData = data.map((row) =>
      row.id === editRowId ? editedData : row
    );
    setData(newData);

    // Close the modal and reset edit states
    setIsModalOpen(false);
    setEditRowId(null);
    setEditedData(null);
  };

  const handleCancelEdit = () => {
    // Close the modal and reset edit states
    setIsModalOpen(false);
    setEditRowId(null);
    setEditedData(null);
  };

  // const handleButtonClick = () => {
  //   // Check if the apiRef is available
  //   if (apiRef.current && apiRef.current.api) {
  //     // Call the processRowModelUpdate method to update the rows
  //     apiRef.current.api.processRowModelUpdate();
  //   }
  // };

  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    console.log(updatedRow, originalRow, "rows");
    handleSave();
    return updatedRow;
  };
  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 70 },
    {
      field: "counter",
      headerName: "Counter name",
      width: 230,
      editable: true,
    },
    { field: "city", headerName: "City name", width: 230, editable: true },
    { field: "region", headerName: "Region", width: 230, editable: true },
    { field: "block", headerName: "Block", width: 230, editable: true },
  ];

  const actionColumn: GridColDef[] = [
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

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="p-2 md:p-5">
        <div className="w-full flex flex-col justify-center items-end md:flex-row md:items-center md:justify-between">
          <Link to="create">
            <Button>+ Create</Button>
          </Link>
          <div className="flex flex-col w-full space-y-2 md:w-1/3 md:space-y-0 md:space-x-2 md:flex-row">
            <InputSelect
              label="Select counter"
              name="counter"
              control={control}
              options={counterOptions}
              fullWidth
            />
            <InputSelect
              label="Select city"
              name="city"
              control={control}
              options={counterOptions}
              fullWidth
            />
            <Button>Search</Button>
          </div>
        </div>
        <Datatable
          rows={data}
          columns={amountColumns.concat(actionColumn)}
          apiRef={apiRef}
          editRowId={editRowId}
          updateRow={handleProcessRowUpdate}
        />
      </div>
      <Modal title="Edit Counter" open={isModalOpen} onClose={handleCancelEdit}>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-center w-full">
            <p className="w-1/3">Counter name</p>
            <div className="w-2/3">
              <MUIinput
                label="Enter counter name"
                name="counter"
                control={control}
                fullWidth
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <p className="w-1/3">Region</p>
            <div className="w-2/3">
              <InputSelect
                label="Select region"
                name="region"
                control={control}
                options={counterOptions}
                fullWidth
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <p className="w-1/3">Block</p>
            <div className="w-2/3">
              <InputSelect
                label="Select Block"
                name="block"
                control={control}
                options={counterOptions}
                fullWidth
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <p className="w-1/3">City</p>
            <div className="w-2/3">
              <InputSelect
                label="Select city"
                name="city"
                control={control}
                options={counterOptions}
                fullWidth
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <div className="deleteButton" onClick={handleCancelEdit}>
              Cancel
            </div>
            <div className="editButton" onClick={handleSave}>
              Save
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CounterList;
