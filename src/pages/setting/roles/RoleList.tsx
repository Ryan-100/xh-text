import React, { useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import { counterOptions, counterRows } from "../../../layout/config";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { role } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

const AdminRoles = () => {
  const [data, setData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const apiRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRoles = async () => {
    try {
      const res = await dispatch(role.getAllRoles() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  const fetchRolesByFilter = async (params) => {
    try {
      const res = await dispatch(role.getAllRolesByFilter(params) as any);
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  const { control, watch } = useForm({
    mode: "onChange",
  });

  const { all_counters } = useSelector((state: any) => state.counter);

  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "10";

  const counterFilter = watch("counter");

  React.useEffect(() => {
    if (counterFilter) {
      fetchRolesByFilter({
        skip,
        take,
        "filter[counter_id]": counterFilter,
      });
      setSearchParams({
        skip,
        take,
        "filter[counter_id]": counterFilter,
      });
    } else {
      fetchRoles();
      setSearchParams();
    }
  }, [dispatch, counterFilter]);

  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async (id) => {
    const res = await dispatch(role.deleteRole(id) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      fetchRoles();
    }
  };

  const counterOptions = all_counters
    ? all_counters?.data?.map((counter) => ({
        value: counter.id,
        label: counter.name,
      }))
    : [];

  const handleEdit = (id) => {
    navigate("/setting/admin-role/" + id + "/edit");
  };

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 123 },
    {
      field: "name",
      headerName: "Role Name",
      width: 361,
    },
    {
      field: "counter",
      headerName: "Counter",
      width: 341,
      renderCell: (params) => {
        return <p className="">{params.row.counter.name}</p>;
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
            <p className="text-2xl font-semibold">Admin Role</p>
          </div>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Admin Role</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center pb-6">
          <div className="flex items-center space-x-6">
            <div className="">
              <p className="text-xs md:text-sm xl:text-base leading-6">
                Filter By Counter
              </p>
              <div className="w-[344px]">
                <InputSelect
                  label={"Choose Counter Name"}
                  name="counter"
                  control={control}
                  options={counterOptions}
                  fullWidth
                />
              </div>
            </div>
          </div>
          <Link to="create" className="self-end">
            <div className="buttonPrimary space-x-2 h-12">
              <Icon name="add" width={24} height={24} />
              <span className="text-sm md:text-base xl:text-xl">
                Create Admin Role
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
          body={"Are you sure to delete this define role? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={() => deleteHandler(deleteId)}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={"The role is successfully deleted. Please check into list."}
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default AdminRoles;
