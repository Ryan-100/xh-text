import React, { useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { useDispatch, useSelector } from "react-redux";
import { block } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

const BlockList = () => {
  const [data, setData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const apiRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBlock = async () => {
    try {
      const res = await dispatch(block.getAllblocks() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  const fetchBlockByFilter = async (params) => {
    try {
      const res = await dispatch(block.getAllBlocksByFilter(params) as any);
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  const { control, watch } = useForm({
    mode: "onChange",
  });

  const { all_cities } = useSelector((state: any) => state.city);

  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "10";

  const cityFilter = watch("city");

  React.useEffect(() => {
    if (cityFilter) {
      fetchBlockByFilter({
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
      fetchBlock();
      setSearchParams();
    }
  }, [dispatch, cityFilter]);

  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async (id) => {
    const res = await dispatch(block.deleteBlock(id) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      fetchBlock();
    }
  };

  const cityOptions = all_cities
    ? all_cities?.data?.map((city) => ({
        value: city.id,
        label: city.city_eng,
      }))
    : [];

  const handleEdit = (id) => {
    navigate("/setting/block/" + id + "/edit");
  };
  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 148 },
    { field: "block_eng", headerName: "Block Name", width: 315 },
    {
      field: "city",
      headerName: "City Branch",
      width: 352,
      renderCell:params=>{
        return <p className="">{params.row.city.city_eng}</p>
      }
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
            <p className="title">Block</p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Block</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center pb-6">
          <div className="flex items-center space-x-6">
            <div className="">
              <p className="text-xs md:text-sm xl:text-base leading-6">
                Filter By City Branch
              </p>
              <div className="w-[344px]">
                <InputSelect
                  label={"Choose Counter Name"}
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
                Create Block
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
          body={"Are you sure to delete this define block? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={() => deleteHandler(deleteId)}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={
            "The block is successfully deleted. Please check into list."
          }
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default BlockList;
