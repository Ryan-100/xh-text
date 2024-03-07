import React, { useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { useDispatch, useSelector } from "react-redux";
import { amount } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

const SettingAmount = () => {
  const [data, setData] = React.useState<any[]>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, watch } = useForm({
    mode: "onChange",
  });

  const { all_cities } = useSelector((state: any) => state.city);

  const cityOptions = all_cities?.data?.map((city) => ({
    value: city.id,
    label: city.city_eng,
  }));

  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "10";

  const from_city_id = watch("from_city");
  const to_city_id = watch("to_city");

  const fetchAmounts = async () => {
    try {
      const res = await dispatch(amount.getAllAmounts() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  const fetchAmountsByFilter = async (params) => {
    try {
      const res = await dispatch(amount.getAllAmountsByFilter(params) as any);
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  React.useEffect(() => {
    //fetch system notification list according to filter
    if (from_city_id && to_city_id) {
      fetchAmountsByFilter({
        skip,
        take,
        "filter[from_city_id]": from_city_id,
        "filter[to_city_id": to_city_id,
      });
      setSearchParams({
        skip,
        take,
        "filter[from_city_id]": from_city_id,
        "filter[to_city_id": to_city_id,
      });
    } else {
      fetchAmounts();
      setSearchParams();
    }
  }, [dispatch, from_city_id, to_city_id]);

  const deleteHandler = async (id) => {
    const res = await dispatch(amount.deleteAmount(id) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      fetchAmounts();
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleEdit = (id) => {
    navigate("" + id + "/edit");
  };

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 100 },
    {
      field: "from_city",
      headerName: "From",
      width: 186,
      renderCell: (params) => {
        return <p className="">{params.row.from_city.city_eng}</p>;
      },
    },
    {
      field: "to_city",
      headerName: "To",
      width: 200,
      renderCell: (params) => {
        return <p className="">{params.row.to_city.city_eng}</p>;
      },
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 152,
      renderCell: (params) => {
        return <p className="">{params.row.weight.weight} KG</p>;
      },
    },
    { field: "delivery_fee", headerName: "Amount", width: 174 },
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
      {data && cityOptions && cityOptions.length > 0 && (
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
              <p className="text-2xl font-semibold">Amount</p>
            </div>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Settings
              </p>
              <p className="py-2 px-2">Amount</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center pb-6">
            <div className="flex items-center space-x-6">
              <div className="">
                <p className="text-xs md:text-sm xl:text-base leading-6">
                  Filter By Start Location
                </p>
                <div className="w-[344px]">
                  <InputSelect
                    label={"Select Counter Name"}
                    name="from_city"
                    control={control}
                    options={cityOptions}
                    fullWidth
                  />
                </div>
              </div>
              <div className="">
                <p className="text-xs md:text-sm xl:text-base leading-6">
                  Filter By End Location
                </p>
                <div className="w-[344px]">
                  <InputSelect
                    label={"Select Branch Name"}
                    name="to_city"
                    control={control}
                    options={cityOptions}
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
                  Create Amount
                </span>
              </div>
            </Link>
          </div>
          {data && data.length > 0 ? (
            <Datatable
              rows={data}
              columns={amountColumns.concat(actionColumn)}
              apiRef={apiRef}
            />
          ) : (
            <p className="text-center">No data</p>
          )}
        </div>
      )}
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={"Are you sure to delete this define amount? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={()=>deleteHandler(deleteId)}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={"The amount is successfully deleted. Please check into list."}
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default SettingAmount;
