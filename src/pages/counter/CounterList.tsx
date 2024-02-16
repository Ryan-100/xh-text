import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { counterOptions, counterRows, roleOptions } from "../../layout/config";
import Button from "../../components/form/Button";
import Datatable from "../../components/table/datatable";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import InputSelect from "../../components/form/InputSelect";
import MUIinput from "../../components/form/MUIinput";
import { useForm } from "react-hook-form";
import Icon from "../../icons";

const CounterList = () => {
  const [data, setData] = useState(counterRows);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const apiRef = useRef(null);
  const navigate = useNavigate();


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
    navigate('/counters/edit/'+id);
      
  };

  const handleSave = () => {
    // Update the data with the edited data
    const newData = data.map((row) =>
      row.id === editRowId ? editedData : row
    );
    setData(newData);

    // Close the modal and reset edit states
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
    { field: "no", headerName: "No.", width: 100 },
    {
      field: "counter",
      headerName: "Counter name",
      width: 371,
    },
    { field: "city", headerName: "City name", width: 337 },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 245,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={""+params.row.id} className="buttonPrimary space-x-2 h-10">
              <Icon name="details" />
              <span>Detail</span>
            </Link>
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              <Icon name="edit" color="#444240" fillColor="#444240" />
            </div>
            <div
              className="editButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <Icon name="delete" color="#444240" fillColor="#444240" />
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
      <div className="">
      <div className="w-full flex justify-between items-center ">
        <div className="flex items-center space-x-6">
          <div className="">
            <p className="text-xs md:text-sm xl:text-base leading-6">
              Filter By Counter Name
            </p>
            <div className="w-[344px]">
              <InputSelect
                label={"Select Counter Name"}
                name="counter"
                control={control}
                options={counterOptions}
                fullWidth
              />
            </div>
          </div>
          <div className="">
            <p className="text-xs md:text-sm xl:text-base leading-6">
              Filter By Branch Name
            </p>
            <div className="w-[344px]">
              <InputSelect
                label={"Select Branch Name"}
                name="role"
                control={control}
                options={counterOptions}
                fullWidth
              />
            </div>
          </div>
        </div>
        <Link to="create" className="self-end">
          <div className="buttonPrimary space-x-2 h-12">
            <Icon name="add" />
            <span className="text-sm md:text-base xl:text-xl">
              {" "}
              Create Counter
            </span>
          </div>
        </Link>
      </div>
        <Datatable
          rows={data}
          columns={amountColumns.concat(actionColumn)}
          apiRef={apiRef}
          editRowId={editRowId}
          updateRow={handleProcessRowUpdate}
        />
      </div>
     </>
  );
};

export default CounterList;
