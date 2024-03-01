import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { roleOptions } from "../../../layout/config";
import InputField from "../../../components/form/InputFiled";
import MuiTextarea from "../../../components/form/TextArea";
import MUIRadioGroup from "../../../components/form/InputRadio";

const RiderReportDetail = () => {
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goToHistory = () => {
    navigate("history");
  };
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold">Notification</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Settings</p>
          <p className="py-2 px-2">Notification</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex text-base">
          <p className="text-secondary leading-6">Date & Time : </p>
          <p className="text-gray leading-6"> 5 Sep 2023, 1:00:00 PM</p>
        </div>
        <div className="flex items-center space-x-6">
          <div
            onClick={goToHistory}
            className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
          >
            <Icon name="history" width={24} height={24} />
            <p className="text-[20px] text-white">History</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">Sent To</p>
          <div className="w-[528px]">
            <InputSelect
              fullWidth
              name="role"
              control={control}
              label={""}
              options={roleOptions}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">Title</p>
          <div className="w-[528px]">
            <InputField
              name="title"
              control={control}
              label={""}
              placeholder="Enter Title Message"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">Body</p>
          <div className="w-[528px]">
            <MuiTextarea
              name="bodu"
              control={control}
              placeholder="Enter Body Message"
              rows={3.5}
              label={""}
            />
          </div>
        </div>
      </div>
      <div className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
        <Icon name="success" width={24} height={24} />
        <p className="text-[20px] text-white">Send</p>
      </div>
    </div>
  );
};

export default RiderReportDetail;
