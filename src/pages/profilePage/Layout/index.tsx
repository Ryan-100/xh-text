import React from "react";
import Icon from "../../../icons";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../store/actions";
import { getLocalStorageData } from "../../../service/auth";
import { formatDate } from "../../../utils";

const ProfileLayout = () => {
  const user_id = getLocalStorageData("user_id");
  const [data, setData] = React.useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAdminById = async () => {
    const res = await dispatch(auth.getAdminUserById(user_id) as any);
    if (res?.statusCode === 200) {
      setData(res?.data);
    }
  };

  React.useEffect(() => {
    getAdminById();
  }, []);

  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("edit");
  };
  return (
    <>
      {data && (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="title">Profile</p>
            <div className="side-title  h-10">
              <p className="py-2 px-4 border-r border-r-gray text-gray">
                Dashboard
              </p>{" "}
              <p className=" py-2 px-4">Profile</p>
            </div>
          </div>
          <div className="bg-white  h-fit rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="flex items-center justify-center space-x-[84px]">
              <div className="flex flex-col">
                <p className="text-gray leading-6">Joined Date</p>
                <p className="text-secondary leading-6">{formatDate(data.created_at)}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray leading-6">Now</p>
                <p className="text-secondary leading-6">{formatDate(new Date())}</p>
              </div>
            </div>
            <Divider className="w-full" />
            <div className="flex space-x-6 justify-start">
              <img
                src={data.profile_image_url?data.profile_image_url:'/person.png'}
                alt="profile"
                className="w-[252px] h-[252px]"
              />
              <div className="flex flex-col h-fit">
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
                  <p className="text-gray">Name</p>
                  <p className="text-secondary w-[235px]">{data.username}</p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Super Admin ID</p>
                  <p className="text-secondary w-[235px]">{data.adminID}</p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
                  <p className="text-gray">Phone</p>
                  <p className="text-secondary w-[235px]">{data.phone}</p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Role</p>
                  <p className="text-secondary w-[235px]">{data.role.name}</p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
                  <p className="text-gray">Password</p>
                  <p className="text-secondary w-[235px] truncate">{data.password}</p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-start justify-between mb-6">
                  <p className="text-gray">Address</p>
                  <p className="text-secondary w-[235px]">
                  {data.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={goToEdit}
            className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 "
          >
            <Icon
              name="edit1"
              color="#fff"
              fillColor="#fff"
              width={24}
              height={24}
            />
            <p className="btn-lg">Edit Profile</p>
          </button>
        </div>
      )}{" "}
    </>
  );
};

export default ProfileLayout;
