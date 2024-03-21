import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import styled from "styled-components";
import { permissionData } from "../../../layout/config";
import { useDispatch } from "react-redux";
import { permission } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import { formatDate } from "../../../utils";

const PermissionDetail = () => {
  const [permissionData, setPermissionData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [roleItem,setRoleItem] = React.useState<any>();
  const { id: permissionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPermissionDetail = async () => {
      try {
        const res = await dispatch(
          permission.getPermissionById({id:permissionId}) as any
        );
        setPermissionData(res?.data[0]);
        const filteredData = res?.data[0]?.role_item_detail.filter(item => item.is_access === 1);
          setRoleItem(filteredData)
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchPermissionDetail();
  }, [dispatch, permissionId]);

  const deleteHandler = async () => {
    const res = await dispatch(permission.deletePermission(permissionId) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      goBack();
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("edit");
  };

console.log(permissionData)
  return (
    <>
  {permissionData &&
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-[2px]">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <p className="title">Admin Permission Detail</p>
        <div className="side-title  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">
            Permission
          </p>{" "}
          <p className=" py-2 px-2">Permission Detail</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
        <div className="flex items-center justify-center space-x-[84px]">
          <div className="flex flex-col">
            <p className="text-gray leading-6">Created Date</p>
            <p className="text-secondary leading-6">
            {formatDate(permissionData?.created_at)}
              
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray leading-6">Created By</p>
            <p className="text-secondary leading-6">
            {permissionData?.created_user?.username || "Unknown"}
              
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div
            onClick={goToEdit}
            className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 "
          >
            <Icon name="edit1" width={24} height={24} />
            <p className="btn-lg">Edit Permission</p>
          </div>
          <div className="editButton h-12" onClick={()=>setIsDelete(true)}>
            <Icon name="delete2" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
        <div className="flex space-x-[190px] justify-start w-full ">
          <div className="flex flex-col space-y-4 w-[504px]">
            <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
              <p className="text-gray">City</p>
              <p className="text-secondary w-[252px]">{permissionData?.city?.city_eng}</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Counter</p>
              <p className="text-secondary w-[252px]">{permissionData?.counter?.name}</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Role</p>
              <p className="text-secondary w-[252px]">
              {permissionData?.role?.name}
              </p>
            </div>
          </div>
          <img
            src="/admin.png"
            alt="profile"
            className="w-[99px] h-[89px] self-center place-self-start"
          />
        </div>
      </div>
      {roleItem && <div className="w-full flex flex-col space-y-4 bg-white rounded-[10px] p-6">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm md:text-base xl:text-xl">Permissions</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-5 gap-2">
            {roleItem?.map((data, i) => (
              <BulletList key={i}>{data.module.module}</BulletList>
            ))}
          </div>
        </div>}
      </div>} 
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={
            "Are you sure to delete this define permission? Please confirm it."
          }
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={deleteHandler}
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

export default PermissionDetail;

const BulletList = styled.li`
  display: list-item;
  font-size: 16px;
  height: 24px;
  list-style-image: url("/list.svg");
`;