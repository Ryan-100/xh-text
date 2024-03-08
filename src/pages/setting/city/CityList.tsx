import React, { useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import { counterOptions } from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { useDispatch, useSelector } from "react-redux";
import { city } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

const CityList = () => {
  const [data, setData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const apiRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCity = async () => {
    try {
      const res = await dispatch(city.getAllCities() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  const fetchCityByFilter = async (params) => {
    try {
      const res = await dispatch(city.getAllCitiesByFilter(params) as any);
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  const { control, watch } = useForm({
    mode: "onChange",
  });

  const {all_cities} = useSelector((state:any)=>state.city)


  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "10";

  const cityFilter = watch("city");

  React.useEffect(() => {
    if (cityFilter) {
      fetchCityByFilter({
        skip,
        take,
        "filter[city_eng]": cityFilter,
      });
      setSearchParams({
        skip,
        take,
        "filter[city_eng]": cityFilter,
      });
    } else {
      fetchCity();
      setSearchParams();
    }
  }, [dispatch, cityFilter]);

  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async (id) => {
    const res = await dispatch(city.deleteCity(id) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      fetchCity();
    }
  };

  const cityOptions = all_cities? all_cities?.data?.map((city) => ({
    value: city.city_eng,
    label: city.city_eng,
  })):[]

  const handleEdit = (id) => {
    navigate("/setting/city/" + id + "/edit");
  };

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 113 },
    {
      field: "city_eng",
      headerName: "City Name",
      width: 258,
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 255,
      renderCell: (params) => {
        return <p className="">{params.row.currency.name}</p>;
      },
    },
    { field: "prefix", headerName: "Prefix", width: 192 },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 243,
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
              onClick={() => {
                setIsDelete(true);
                setDeleteId(params.row.id);
              }}
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
            <p className="text-2xl font-semibold">City / Branch</p>
          </div>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Branch</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center pb-6">
          <div className="flex items-center space-x-6">
            <div className="">
              <p className="text-xs md:text-sm xl:text-base leading-6">
                Filter By Branch Name
              </p>
              <div className="w-[344px]">
                <InputSelect
                  label={"Choose Branch Name"}
                  name="city"
                  control={control}
                  options={cityOptions}
                  fullWidth
                />
              </div>
            </div>
          </div>
          <Link to="create" className="self-end">
            <div className="buttonPrimary space-x-2 h-12">
              <Icon name="add" width={24} height={24} />
              <span className="text-sm md:text-base xl:text-xl">
                Create Branch
              </span>
            </div>
          </Link>
        </div>
        {data && (
          <Datatable
            rows={data}
            columns={amountColumns.concat(actionColumn)}
            apiRef={apiRef}
          />
        )}
      </div>
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={"Are you sure to delete this define city? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={() => deleteHandler(deleteId)}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={
            "The city/branch is successfully deleted. Please check into list."
          }
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default CityList;
