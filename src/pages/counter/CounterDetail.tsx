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
    navigate("/counters/edit/123");
  };
  const goToEditPermission = () => {
    navigate("/counters/edit/permissions/123");
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
        <p className="text-2xl font-semibold">Counter Detail</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">Counter</p>{" "}
          <p className=" py-2 px-4">Counter Detail</p>
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
        <div className="flex space-x-[176px] justify-start w-full">
          <div className="flex flex-col">
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
          <img
            src="/counter.svg"
            alt="profile"
            className="w-[247px] h-[184px] self-center place-self-start"
          />
        </div>
      </div>
      <div className="bg-white rounded-[10px] shadow p-6 grid grid-cols-12 grid-rows-1">
        <div className="w-[136px]   col-span-2 flex flex-col space-y-2">
          <p className="h-[48px] text-gray">Total Admins</p>
          <p className="h-[48px] text-gray">Total Riders</p>
          <p className="h-[48px] text-gray">Total Scanned Packages</p>
        </div>
        <div className="w-[253px]   col-span-2 flex flex-col space-y-2">
          <p className="h-[48px]">3</p>
          <p className="h-[48px]">15</p>
          <p className="h-[48px]">1532</p>
        </div>
        <div className=" col-span-2 flex flex-col space-y-2">
          <p className="h-[48px] text-primary">View All</p>
          <p className="h-[48px] text-primary">View All</p>
          <p className="h-[48px] text-primary">View All</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDetail;
