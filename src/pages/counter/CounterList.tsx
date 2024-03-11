import React, { useEffect, useRef, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { counterOptions, counterRows } from "../../layout/config";
import Datatable from "../../components/table/datatable";
import { Link, useNavigate } from "react-router-dom";
import InputSelect from "../../components/form/InputSelect";
import { useForm } from "react-hook-form";
import Icon from "../../icons";
import { useDispatch } from "react-redux";
import { counter } from "../../store/actions/counter.action";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const CounterList = () => {
  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [counterToDelete, setCounterToDelete] = useState(null);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCounter, setSelectedCounter] = useState("");
  const { control, setValue, watch } = useForm({
    defaultValues: {
      counter: "",
    },
  });
  const selectedCity = watch("city", "");
  const selectedCounterName = watch("counterName", "");
  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const res = await dispatch(counter.getAllCounters() as any); // Adjust your action as necessary
        console.log(res);
        setData(res?.data || []);
      } catch (error) {
        console.error("Error fetching counters:", error);
        setData([]);
      }
    };
    fetchCounters();
  }, [dispatch]);

  const cityOptions = data.map((counter) => ({
    label: counter.city?.city_eng,
    value: counter.city_id.toString(),
  }));

  const counterOptions = data.map((counter) => ({
    label: counter.name,
    value: counter.id.toString(),
  }));

  const getFilteredData = () => {
    return data.filter((item) => {
      return (
        (selectedCity ? item.city_id.toString() === selectedCity : true) &&
        (selectedCounterName
          ? item.id.toString() === selectedCounterName
          : true)
      );
    });
  };

  // const blockOptions = data && data.map(counter => ({
  //   label: counter.block?.block_eng,
  //   value: counter.block_id
  // }));

  // const { control, handleSubmit, setValue } = useForm({
  //   mode: "onChange",
  //   defaultValues: {
  //     // Specify your default values here
  //     counter: editedData?.counter,
  //     city: editedData?.city,
  //     block: editedData?.block,
  //     region: editedData?.region,
  //   },
  // });

  const openDeleteConfirmation = (id) => {
    setOpenDeleteDialog(true);
    setCounterToDelete(id);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCounterToDelete(null);
  };

  const confirmDeleteCounter = async () => {
    if (counterToDelete) {
      try {
        await dispatch(counter.deleteCounter(counterToDelete) as any);
        setData(data.filter((counter) => counter.id !== counterToDelete));
        closeDeleteDialog();
      } catch (error) {
        console.error("Error deleting counter:", error);
        closeDeleteDialog();
      }
    }
  };

  const handleEdit = (id) => {
    navigate("/counters/edit/" + id);
  };

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 100 },
    {
      field: "name",
      headerName: "Counter name",
      width: 371,
    },
    {
      field: "city",
      headerName: "City name",
      width: 337,
      renderCell: (params) => {
        return <p className="">{params.row.city.city_eng}</p>;
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
              className="deleteButton"
              onClick={() => openDeleteConfirmation(params.row.id)}
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
      {data && (
        <div className="">
          <div className="w-full flex justify-between items-center mb-6">
            <div className="flex items-center space-x-6">
              <div className="">
                <p className="text-xs md:text-sm xl:text-base leading-6">
                  Filter By Counter Name
                </p>
                <div className="w-[344px]">
                  <InputSelect
                    label="Filter By Counter Name"
                    name="counterName"
                    control={control}
                    options={counterOptions}
                    fullWidth
                    onChange={(e) => setValue("counterName", e.target.value)}
                  />
                </div>
              </div>
              <div className="">
                <p className="text-xs md:text-sm xl:text-base leading-6">
                  Filter By Branch Name
                </p>
                <div className="w-[344px]">
                  <InputSelect
                    label="Filter By City"
                    name="city"
                    control={control}
                    options={cityOptions}
                    fullWidth
                    onChange={(e) => setValue("city", e.target.value)}
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
            rows={getFilteredData()}
            columns={[...amountColumns, ...actionColumn]}
          />
        </div>
      )}
      <Dialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this counter?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDeleteDialog}
            className="bg-black text-gray-800 text-sm py-2 px-4 rounded shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteCounter}
            className="bg-red text-white text-sm py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CounterList;
