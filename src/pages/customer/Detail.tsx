import React from "react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "../../icons";
import { permissionData } from "../../layout/config";
import styled from "styled-components";

const CustomerDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("/admin/edit/123");
  };
  const goToEditPermission = () => {
    navigate("/admin/edit/permissions/123");
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
        <p className="text-2xl font-semibold">Customer Detail</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">
            Customer List
          </p>{" "}
          <p className=" py-2 px-4">Customer Detail</p>
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
              <Icon name="history" width={24} height={24} />
              <p className="text-[20px] text-white">Parcel History</p>
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
            <div className="h-fit w-[411px] py-3 px-4 flex items-start justify-between bg-gray-light-1">
              <p className="text-gray">Rider Name</p>
              <p className="text-secondary w-[235px]">
                Myint Thu Thu Htet Wai Yan Min Hein Nyi Nyi
              </p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Customer ID</p>
              <div className="flex items-center justify-normal space-x-2 w-[235px]">
                <p className="text-secondary">LABAER012345 </p>
                <Icon name="copy" />
              </div>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Type</p>
              <p className="text-secondary w-[235px]">Pick Up</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Phone</p>
              <p className="text-secondary w-[235px]">09976666666</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Password</p>
              <p className="text-secondary w-[235px]">123456</p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Address</p>
              <p className="text-secondary w-[235px]">
                Lashio, Thiri Mahar Quarter, East Region, Station Street
              </p>
            </div>
            <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
              <p className="text-gray">Created By</p>
              <p className="text-secondary w-[235px]">Self</p>
            </div>
          </div>
          <div className="bg-gray-light-1 rounded-[10px] p-4 w-[252px] h-[192px] flex flex-col space-y-2">
            <p className="font-medium text-black">China Destination Address</p>
            <p className="text-sm font-normal">
              LABAER012345 Lashio Block A East Region Near Lashio University
              ABCDEF street House No. 12
            </p>
            <div className="bg-primary self-center w-[118px] h-10 rounded-[10px] flex items-center justify-center space-x-2">
              <Icon name='copy' color='#fff' fillColor="#fff"/>
              <p className="text-white font-semibold">Copy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
