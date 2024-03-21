import React, { useRef} from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import { permission } from "../../../store/actions";

const AdminPermissions = () => {
  const [data, setData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const apiRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPermission = async () => {
    try {
      const res = await dispatch(permission.getAllPermission() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  const fetchPermissionByFilter = async (params) => {
    try {
      const res = await dispatch(permission.getAllPermissionByFilter(params) as any);
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  const { control, watch } = useForm({
    mode: "onChange",
  });

  const { all_counters } = useSelector((state: any) => state.counter);
  const { all_roles } = useSelector((state: any) => state.role);

  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "10";

  const counterFilter = watch("counter_id");
  const roleFilter = watch("role_id");

  React.useEffect(() => {
    if (counterFilter || roleFilter) {
      fetchPermissionByFilter({
        skip,
        take,
        "filter[counter_id]": counterFilter,
        "filter[role_id]": roleFilter,
      });
      setSearchParams({
        skip,
        take,
        "filter[counter_id]": counterFilter,
        "filter[role_id]": roleFilter,
      });
    } else {
      fetchPermission();
      setSearchParams();
    }
  }, [dispatch, counterFilter, roleFilter]);

  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async (id) => {
    const res = await dispatch(permission.deletePermission(id) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      fetchPermission();
    }
  };

  const counterOptions = all_counters
    ? all_counters?.data?.map((counter) => ({
        value: counter.id,
        label: counter.name,
      }))
    : [];
  const roleOptions = all_roles
    ? all_roles?.data?.map((role) => ({
        value: role.id,
        label: role.name,
      }))
    : [];

  const handleEdit = (id) => {
    navigate("/setting/admin-permission/" + id + "/edit");
  };
  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 87 },
    {
      field: "city",
      headerName: "City",
      width: 120,
      renderCell:params=>{
        return <p className="">{params.row.city.city_eng}</p>
      }
    },
    { field: "counter", headerName: "Counter", width: 197,
    renderCell:params=>{
      return <p className="">{params.row.counter.name}</p>
    }
  },
    { field: "role", headerName: "Role", width: 240,
    renderCell:params=>{
      return <p className="">{params.row.role.name}</p>
    }
  },
    {
      field: "role_item_detail",
      headerName: "Permission",
      width: 169,
      renderCell: (params) => {
        const filteredData = params.row.role_item_detail.filter(item => item.is_access === 1);
        return (
          <div className="flex flex-col space-y-1">
          {params.row.role_item_detail.map((data, i) => (
            (i <= 2 && <p key={i} className="">{data.module.module}</p>) ||
            (i === 3 && <p key={i} className="text-gray font-normal">{filteredData.length - 3}+ more permissions</p>)
          ))}
        </div>
        
        );
      },
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 254,
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
            <p className="title">Admin Permission</p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Admin Permission</p>
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
                  name="counter_id"
                  control={control}
                  options={counterOptions}
                  fullWidth
                />
              </div>
            </div>
            <div className="">
              <p className="text-xs md:text-sm xl:text-base leading-6">
                Filter By Role
              </p>
              <div className="w-[344px]">
                <InputSelect
                  label={"Choose Role Name"}
                  name="counter_id"
                  control={control}
                  options={roleOptions}
                  fullWidth
                />
              </div>
            </div>
          </div>
          <Link to="create" className="self-end">
            <div className="buttonPrimary space-x-2 h-12">
              <Icon name="add" width={24} height={24} />
              <span className="text-sm md:text-base xl:text-xl">
                Create Permission
              </span>
            </div>
          </Link>
        </div>
       {data && <Datatable
          rows={data}
          columns={amountColumns.concat(actionColumn)}
          apiRef={apiRef}
          rowHeight={136}
        />}
      </div>
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={"Are you sure to delete this define permission? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={() => deleteHandler(deleteId)}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={
            "The permission is successfully deleted. Please check into list."
          }
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default AdminPermissions;
