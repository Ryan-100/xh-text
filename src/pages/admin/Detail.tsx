import React from "react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "../../icons";
import { permissionData } from "../../layout/config";
import styled from "styled-components";

const AdminDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("/admin/create");
  };
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-[2px]">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <p className="text-2xl font-semibold">Admin Detail</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">
            Admin List
          </p>{" "}
          <p className=" py-2 px-4">Admin Detail</p>
        </div>
      </div>
      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
        <div className="w-full flex items-center justify-between">
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
          <div className="flex items-center space-x-6">
            <div
              onClick={goToEdit}
              className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
            >
              <Icon name="edit1" width={24} height={24} />
              <p className="text-[20px] text-white">Edit Information</p>
            </div>
            <div className="editButton h-12">
              <Icon name="delete2" />
            </div>
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
              <p className="text-gray">Admin Name</p>
              <p className="text-secondary w-[235px]">Hsu Hnin Wai</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Admin ID</p>
              <div className="flex items-center justify-normal space-x-2 w-[235px]">
                <p className="text-secondary">SuperAdmin_HHW </p>
                <Icon name="copy" />
              </div>
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
              <p className="text-gray">Branch</p>
              <p className="text-secondary w-[235px]">Lashio</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Counter</p>
              <p className="text-secondary w-[235px]">Lashio_Branch_Counter1</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Password</p>
              <p className="text-secondary w-[235px]">123456</p>
            </div>
            <div className="h-fit w-[411px] py-3 px-4 flex items-start justify-between ">
              <p className="text-gray">Address</p>
              <p className="text-secondary w-[235px]">
                Lashio, Thiri Mahar Quarter, East Region, Station Street
              </p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1 mb-6">
              <p className="text-gray">Created By</p>
              <p className="text-secondary w-[235px]">SuperAdmin_HHW</p>
            </div>
          </div>
        </div>
        <Divider className="w-full" />
        <div className="w-full flex flex-col space-y-4">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm md:text-base xl:text-xl">Permissions</p>
            <div
              onClick={goToEdit}
              className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
            >
              <Icon name="edit1" width={24} height={24} />
              <p className="text-[20px] text-white">Edit Permission</p>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-5 gap-2">
            {permissionData.map((data, i) => (
              <BulletList key={i}>{data}</BulletList>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetail;

const BulletList = styled.li`
  display: list-item;
  font-size: 16px;
  height: 24px;
  list-style-image: url("/list.svg");
  padding-inline-start: 12px;
`;
