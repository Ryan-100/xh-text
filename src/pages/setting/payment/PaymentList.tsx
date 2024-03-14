import React, { useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

const PaymentList = () => {
  const [data, setData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const apiRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPaymentType = async () => {
    try {
      const res = await dispatch(payment.getAllPaymentTypes() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  const fetchPaymentTypesByFilter = async (params) => {
    try {
      const res = await dispatch(payment.getAllPaymentTypesByFilter(params) as any);
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  const { control, watch } = useForm({
    mode: "onChange",
  });

  const { all_cities } = useSelector((state: any) => state.city);
  const cityFilter = watch("city");

  React.useEffect(() => {
    if (cityFilter) {
      fetchPaymentTypesByFilter({
        skip,
        take,
        "filter[city_id]": cityFilter,
      });
      setSearchParams({
        skip,
        take,
        "filter[city_id]": cityFilter,
      });
    } else {
      fetchPaymentType();
      setSearchParams();
    }
  }, [dispatch, cityFilter]);

  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "10";

  const cityOptions = all_cities
  ? all_cities?.data?.map((city) => ({
      value: city.id,
      label: city.city_eng,
    }))
  : [];

  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async (id) => {
    const res = await dispatch(payment.deletePaymentType(id) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      fetchPaymentType();
    }
  };


  const handleEdit = (id) => {
    navigate("/setting/payment-method/" + id + "/edit");
  };

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 148 },
    { field: "city", headerName: "City", width: 285,
    renderCell:params=>{
      return <p className="">{params.row.city.city_eng}</p>
    }
  },
    { field: "name", headerName: "Payment", width: 315 },
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
            <p className="text-2xl font-semibold">Payment Method</p>
          </div>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Payment Method</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center pb-6">
          <div className="flex items-center space-x-6">
            <div className="">
              <p className="text-xs md:text-sm xl:text-base leading-6">
                Filter By City
              </p>
              <div className="w-[344px]">
                <InputSelect
                  label={"Choose City Name"}
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
                Create Payment
              </span>
            </div>
          </Link>
        </div>
       {data && <Datatable
          rows={data}
          columns={amountColumns.concat(actionColumn)}
          apiRef={apiRef}
        />}
      </div>
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={"Are you sure to delete this define payment type? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={() => deleteHandler(deleteId)}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={
            "The payment type is successfully deleted. Please check into list."
          }
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default PaymentList;
