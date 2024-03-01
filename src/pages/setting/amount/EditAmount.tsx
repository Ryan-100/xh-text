import React from "react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useForm } from "react-hook-form";

const AmountDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const {control} = useForm();

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
        <p className="text-2xl font-semibold">Amount Detail</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Amount</p>{" "}
          <p className=" py-2 px-2">Amount Detail</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
        <div className="flex space-x-6 justify-start w-full ">
          <div className="flex flex-col space-y-4 w-[780px]">
            <div className="h-12 w-full py-3 px-4 flex items-center">
              <p className="text-gray w-[252px] text-xl">From</p>
              <p className="text-secondary w-[252px] text-xl">Lashio</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center">
              <p className="text-gray w-[252px] text-xl">To</p>
              <p className="text-secondary w-[252px] text-xl">Lashio_Branch_Counter1</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center">
              <p className="text-gray w-[252px] text-xl">Weight</p>
              <p className="text-secondary w-[252px] text-xl">123456</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-start ">
              <p className="text-gray w-[252px] text-xl">Currency</p>
              <p className="text-secondary w-[252px] text-xl">Lashio</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center mb-6">
              <p className="text-gray w-[252px] text-xl">Amount</p>
              <div className="w-[528px]">
                <InputField
                  name="amount"
                  type="number"
                  control={control}
                  label={""}
                  placeholder="Enter Amount"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
        <Icon name="save" width={16} height={16} />
        <p className="text-[20px] text-white">Save Updates</p>
      </div>
    </div>
  );
};

export default AmountDetail;
