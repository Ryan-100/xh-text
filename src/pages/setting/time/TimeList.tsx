import { useRef, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import {
  counterOptions,
  permissionRows,
} from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";

const RegionList = () => {
  const [data, setData] = useState(permissionRows);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

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
    navigate("/counters/edit/" + id);
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

  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    console.log(updatedRow, originalRow, "rows");
    handleSave();
    return updatedRow;
  };
  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 148 },
    { field: "currency", headerName: "Currency", width: 315 },
    {
      field: "branch",
      headerName: "Branch",
      width: 352,
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 244,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"" + params.row.id}
              className="buttonPrimary space-x-2 h-10"
            >
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

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <div className="text-center">
            <p className="title">Currency</p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Currency</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center pb-6">
          <div className="flex items-center space-x-6">
            <div className="">
              <p className="text-xs md:text-sm xl:text-base leading-6">
                Filter By Branch
              </p>
              <div className="w-[344px]">
                <InputSelect
                  label={"Choose Counter Name"}
                  name="counter"
                  control={control}
                  options={counterOptions}
                  fullWidth
                />
              </div>
            </div>
          </div>
          <Link to="create" className="self-end">
            <div className="buttonPrimary space-x-2 h-12">
              <Icon name="add" width={24} height={24} />
              <span className="text-sm md:text-base xl:text-xl">
                Create Currency
              </span>
            </div>
          </Link>
        </div>
        <Datatable
          rows={data}
          columns={amountColumns.concat(actionColumn)}
          apiRef={apiRef}
          editRowId={editRowId}
          rowHeight={136}
          updateRow={handleProcessRowUpdate}
        />
      </div>
    </>
  );
};

export default RegionList;
