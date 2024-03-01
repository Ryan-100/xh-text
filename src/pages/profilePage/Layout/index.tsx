import React from "react";
import Icon from "../../../icons";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () =>{
    navigate('edit')
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-[2px]">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <p className="text-2xl font-semibold">Profile</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">Dashboard</p>{" "}
          <p className=" py-2 px-4">Profile</p>
        </div>
      </div>
      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
        <div className="flex items-center justify-center space-x-[84px]">
          <div className="flex flex-col">
            <p className="text-gray leading-6">Joined Date</p>
            <p className="text-secondary leading-6">9 Sep 2022</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray leading-6">Now</p>
            <p className="text-secondary leading-6">9 Sep 2022</p>
          </div>
        </div>
        <Divider className="w-full" />
        <div className="flex space-x-6 justify-start">
          <img
            src="/profile.png"
            alt="profile"
            className="w-[252px] h-[252px]"
          />
          <div className="flex flex-col">
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Name</p>
              <p className="text-secondary w-[235px]">Hsu Hnin Wai</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Super Admin ID</p>
              <p className="text-secondary w-[235px]">SuperAdmin_HHW</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Phone</p>
              <p className="text-secondary w-[235px]">09976666666</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Role</p>
              <p className="text-secondary w-[235px]">Super Admin</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Password</p>
              <p className="text-secondary w-[235px]">123456</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-start justify-between mb-6">
              <p className="text-gray">Address</p>
              <p className="text-secondary w-[235px]">
                Lashio, Thiri Mahar Quarter, East Region, Station Street
              </p>
            </div>
          </div>
        </div>
      </div>
      <div onClick={goToEdit} className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
        <Icon name="edit1" color="#fff" fillColor="#fff" width={24} height={24} />
        <p className="text-[20px] text-white">Edit Profile</p>
      </div>
    </div>
  );
};

export default ProfileLayout;
