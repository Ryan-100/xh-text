import React, { useRef, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { counterOptions, counterRows } from "../../layout/config";
import Datatable from "../../components/table/datatable";
import { Link, useNavigate } from "react-router-dom";
import InputSelect from "../../components/form/InputSelect";
import { useForm } from "react-hook-form";
import Icon from "../../icons";
import { useDispatch } from "react-redux";
import { counter } from "../../store/actions/counter.action";

const CounterList = () => {
  const [data, setData] = useState();
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchCounters = async () => {
      try {
        const res = await dispatch(counter.getAllCounters() as any);
        console.log(res)
        setData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCounters();
  }, [dispatch]);

  console.log(data);

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

  const handleDelete = () => {
    // setData(data?.filter((item) => item.id !== id));
    setIsDelete(true);
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
    { field: "city", headerName: "City name", width: 337,renderCell:(params)=>{
      return <p className="">{params.row.city.city_eng}</p>
    } },
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
              className="editButton"
              onClick={() => handleDelete()}
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
     {data && <div className="">
        <div className="w-full flex justify-between items-center mb-6">
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
        />
      </div>}
    </>
  );
};

export default CounterList;
