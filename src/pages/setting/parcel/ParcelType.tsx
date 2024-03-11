import React, { useRef, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { useDispatch, useSelector } from "react-redux";
import { parcel } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

export const parcelStateOptions = [
  {
    value: 1,
    label: "Default",
  },
  {
    value: 0,
    label: "Other",
  },
];

const ParcelType = () => {
  const [data, setData] = useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  const apiRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, watch } = useForm({
    mode: "onChange",
  });

  const {all_parcel} = useSelector((state:any)=>state.parcel)

  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "10";

  const parcel_type = watch("parcel_type");
  const state = watch("state");

  console.log(parcel_type, state);

  const fetchParcel = async () => {
    try {
      const res = await dispatch(parcel.getAllParcel() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  const fetchParcelByFilter = async (params) => {
    try {
      const res = await dispatch(parcel.getAllParcelByFilter(params) as any);
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  React.useEffect(() => {
    if (parcel_type || state === 0 || 1) {
      fetchParcelByFilter({
        skip,
        take,
        "filter[parcel_type]": parcel_type,
        "filter[state]": state,
      });
      setSearchParams({
        skip,
        take,
        "filter[parcel_type]": parcel_type,
        "filter[state]": state,
      });
    } else {
      fetchParcel();
      setSearchParams();
    }
  }, [parcel_type, state]);

  const parcelTypeOptions = all_parcel?.data?.map((parcel) => ({
    value: parcel.parcel_type,
    label: parcel.parcel_type,
  }));

  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async (id) => {
    const res = await dispatch(parcel.deleteParcel(id) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      fetchParcel();
    }
  };

  const handleEdit = (id) => {
    navigate("/setting/parcel-type/" + id + "/edit");
  };

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 100 },
    {
      field: "parcel_type",
      headerName: "Parcel Type Name",
      width: 371,
    },
    {
      field: "state",
      headerName: "State",
      width: 341,
      renderCell: (params) => {
        return (
          <p className="">{params.row.state === 1 ? "Default" : "Other"}</p>
        );
      },
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
      {data && parcelStateOptions && parcelTypeOptions && (
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
              <p className="text-2xl font-semibold">Parcel Type</p>
            </div>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Settings
              </p>
              <p className="py-2 px-2">Parcel Type</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center pb-6">
            <div className="flex items-center space-x-6">
              <div className="">
                <p className="text-xs md:text-sm xl:text-base leading-6">
                  Filter By Name
                </p>
                <div className="w-[344px]">
                  <InputSelect
                    label={"Select Parcel Type"}
                    name="parcel_type"
                    control={control}
                    options={parcelTypeOptions}
                    fullWidth
                  />
                </div>
              </div>
              <div className="">
                <p className="text-xs md:text-sm xl:text-base leading-6">
                  Filter By State
                </p>
                <div className="w-[344px]">
                  <InputSelect
                    label={"Select Parcel State"}
                    name="state"
                    control={control}
                    options={parcelStateOptions}
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
                  Create Parcel Type
                </span>
              </div>
            </Link>
          </div>
          <Datatable
            rows={data}
            columns={amountColumns.concat(actionColumn)}
            apiRef={apiRef}
          />
        </div>
      )}
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={
            "Are you sure to delete this define parcel type? Please confirm it."
          }
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={() => deleteHandler(deleteId)}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={
            "The parcel type is successfully deleted. Please check into list."
          }
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default ParcelType;
