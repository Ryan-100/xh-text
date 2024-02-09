import { useRef, useState } from "react";
import Datatable from "../../components/table/datatable";
import { GridColDef } from "@mui/x-data-grid";
import { counterOptions, roleOptions, userRows } from "../../layout/config";
import { Link } from "react-router-dom";
import InputSelect from "../../components/form/InputSelect";
import { useForm } from "react-hook-form";
import Icon from "../../icons";

const AdminList = () => {
  const [data, setData] = useState(userRows);
  const [editRowId, setEditRowId] = useState(null);
  const apiRef = useRef(null);

  const { control } = useForm({ mode: "onChange" });

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
  const userColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "No.",
      width: 78,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <>
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img} alt="avatar" />
              <p className="MuiDataGrid-cellContent">{params.row.username}</p>
            </div>
          </>
        );
      },
    },
    { field: "email", headerName: "Email", width: 230, editable: true },
    { field: "age", headerName: "Age", width: 100, editable: true },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
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
            <Link to='123' className="buttonPrimary space-x-2 h-10">
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
    <div className="">
      <div className="w-full flex flex-col justify-center items-end md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-6">
          <div className="">
            <p className="text-xs md:text-sm xl:text-base leading-6">
              Filter By Role
            </p>
            <div className="w-[344px]">
              <InputSelect
                name="role"
                control={control}
                options={roleOptions}
                fullWidth
                label={"Choose Admin Role"}
              />
            </div>
          </div>
          <div className="">
            <p className="text-xs md:text-sm xl:text-base leading-6">
              Filter By Counter Name
            </p>
            <div className="w-[344px]">
              <InputSelect
                name="counter"
                control={control}
                options={counterOptions}
                fullWidth
                label={"Choose Counter Name"}
              />
            </div>
          </div>
        </div>
        <Link to="create">
          <div className="buttonPrimary space-x-2 h-12">
            <Icon name="add" />
            <span className="text-sm md:text-base xl:text-xl">
              {" "}
              Create Admin
            </span>
          </div>
        </Link>
      </div>
      <Datatable
        rows={data}
        columns={userColumns.concat(actionColumn)}
        apiRef={apiRef}
        editRowId={editRowId}
        updateRow={handleProcessRowUpdate}
      />
    </div>
  );
};

export default AdminList;
