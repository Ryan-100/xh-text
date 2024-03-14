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

import ModalComponent from "../../components/Modal";
import AlertModal from "../../components/Modal/AlertModal";

const CounterList = () => {
  const [data, setData] = useState([]);
  
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const dispatch = useDispatch();
  const { control, watch } = useForm({
    defaultValues: {
      counter: "",
      city: "",
      counterName: "",
    },
  });

  const selectedCity = watch("city");
  const selectedCounterName = watch("counterName");

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
    setDeleteId(id); // corrected function to set the deleteId
  };

  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const deleteHandler = async (id) => {
    if (id) {
      try {
        await dispatch(counter.deleteCounter(id) as any);
        setData(data.filter((counter) => counter.id !== id));
        // Show a success message
        setAlertMsg("Counter deleted successfully.");
        setIsAlert(true);
        closeDeleteDialog();
        setTimeout(() => navigate("/counters"), 2000);
      } catch (error) {
        console.error("Error deleting counter:", error);
        // Show an error message
        setAlertMsg("Error deleting counter. Please try again.");
        setIsAlert(true);
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
                    onChange={(selectedValue) => console.log(selectedValue)}
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
                    onChange={(selectedValue) => console.log(selectedValue)}
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
            apiRef={apiRef}
            rows={getFilteredData()}
            columns={[...amountColumns, ...actionColumn]}
          />
        </div>
      )}
      <ModalComponent
        title="Confirm Delete"
        body="Are you sure you want to delete this counter?"
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        onConfirm={() => deleteHandler(deleteId)}
      />
      <AlertModal
        title="Alert"
        body={alertMsg}
        open={isAlert}
        onClose={() => setIsAlert(false)}
      />
    </>
  );
};

export default CounterList;