import { useRef, useState } from "react";
import Button from "../../../components/form/Button";
import Datatable from "../../../components/table/datatable";
import { GridColDef } from "@mui/x-data-grid";
import { bannderRows } from "../../../layout/config";
import { Link } from "react-router-dom";

const Banner = () => {
  const [data, setData] = useState(bannderRows);
  const [editRowId, setEditRowId] = useState(null);
  const apiRef = useRef(null);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };



  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    console.log(updatedRow, originalRow, "rows");
    return updatedRow;
  };
  const userColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 70 },
    { field: "link", headerName: "Link", width: 230 },
    {
      field: "img",
      headerName: "Image",
      width: 230,
      renderCell: (params) => {
        return <img className="w-20 h-10" src={params.row.img} alt="banner" />;
      },
    },
    { field: "createdAt", headerName: "Date", width: 100 },
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link className="editButton" to={""+params.row.id}>
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
        <Link to='create'>
        <Button>+ New Banner</Button>
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

export default Banner;
