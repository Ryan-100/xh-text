import { useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import Button from '../../components/form/Button';
import Datatable from '../../components/table/datatable';
import { parcelLists } from '../../layout/config';


const ParcelLists = () => {
  const [data, setData] = useState(parcelLists);
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
    console.log(updatedRow,originalRow,'rows');
    handleSave();
    return updatedRow;
  };
  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 70 },
    {
      field: "barcode",
      headerName: "Barcode",
      width: 230,
      editable: true,
    },
    {
      field: "username",
      headerName: "User name",
      width: 230,
      editable: true,
    },
    {
      field: "type",
      headerName: "Parcel Type",
      width: 230,
    },
    {
      field: "counter",
      headerName: "Counter",
      width: 230,
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
            {editRowId === params.row.id ? (
              <>
                <div
                  className="editButton"
                  onClick={() => {handleButtonClick();handleSave();}}
                >
                  Save
                </div>
                <div
                  className="cancelButton"
                  onClick={() => handleCancelEdit()}
                >
                  Cancel
                </div>
              </>
            ) : (
              <div
                className="editButton"
                onClick={() => handleEdit(params.row.id)}
              >
                Edit
              </div>
            )}
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
    <div className='p-2 md:p-5'>
       <div className="w-full flex flex-col justify-center items-end md:flex-row md:items-center md:justify-between">
       <Link to="create">
          <Button>+ Create</Button>
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
      columns={amountColumns.concat(actionColumn)}
      apiRef={apiRef}
      editRowId={editRowId}
      updateRow={handleProcessRowUpdate}
      />
    </div>

  )
}

export default ParcelLists