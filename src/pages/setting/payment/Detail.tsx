import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";

const PaymentMethodDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("edit");
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
        <p className="text-2xl font-semibold">Payment Method Detail</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">
          Payment Method
          </p>{" "}
          <p className=" py-2 px-2">Payment Method Detail</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
        <div className="flex items-center justify-center space-x-[84px]">
          <div className="flex flex-col">
            <p className="text-gray leading-6">Created Date</p>
            <p className="text-secondary leading-6">9 Sep 2022</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray leading-6">Created By</p>
            <p className="text-secondary leading-6">SuperAdmin_HHW</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div
            onClick={goToEdit}
            className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
          >
            <Icon name="edit1" width={24} height={24} />
            <p className="text-[20px] text-white">Edit Payment</p>
          </div>
          <div className="editButton h-12">
            <Icon name="delete2" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
        <div className="flex space-x-[190px] justify-start w-full ">
          <div className="flex flex-col space-y-4 w-[504px]">
            <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
              <p className="text-gray">City</p>
              <p className="text-secondary w-[252px]">Lashio</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
              <p className="text-gray">Paayment Method Name</p>
              <p className="text-secondary w-[252px]">KBZ Pay</p>
            </div>            
          </div>
          <img
            src={'/kbz.png'}
            alt="profile"
            className="w-[110px] h-[110px] self-center place-self-start"
          />
        </div>
      </div>
      </div>
  );
};

export default PaymentMethodDetail;
