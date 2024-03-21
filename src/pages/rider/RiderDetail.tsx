import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../icons";
import { Divider } from "@mui/material";

const RiderDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goToDeliveredHistory = () => {
    navigate("/counters/delivered-history");
  };
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
        <p className="title">Rider Detail</p>
        <div className="side-title  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">Counter</p>{" "}
          <p className=" py-2 px-4">Rider Detail</p>
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
            <div className="flex flex-col">
              <p className="text-gray leading-6">Delivered Packages</p>
              <p className="text-secondary leading-6">505 Packages</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div
              onClick={goToDeliveredHistory}
              className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 "
            >
              <Icon name="history" width={24} height={24} />
              <p className="btn-lg">Delivered History</p>
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
              <p className="text-gray">Rider Name</p>
              <p className="text-secondary w-[235px]">Hsu Hnin Wai</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Rider ID</p>
              <p className="text-secondary w-[235px]">SuperAdmin_HHW</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Phone</p>
              <p className="text-secondary w-[235px]">09976666666</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Branch</p>
              <p className="text-secondary w-[235px]">Lashio</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Counter</p>
              <p className="text-secondary w-[235px]">Lashio_Branch_Counter1</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Password</p>
              <p className="text-secondary w-[235px]">123456</p>
            </div>
            <div className="h-fit w-[411px] py-3 px-4 flex items-start justify-between bg-gray-light-1">
              <p className="text-gray">Address</p>
              <p className="text-secondary w-[235px]">
                Lashio, Thiri Mahar Quarter, East Region, Station Street
              </p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-start justify-between mb-6">
              <p className="text-gray">Created By</p>
              <p className="text-secondary w-[235px]">Lashio_Branch_Counter1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDetail;
