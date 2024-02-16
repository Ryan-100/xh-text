import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Icon from "../../icons";
import InputField from "../../components/form/InputFiled";
import MuiTextarea from "../../components/form/TextArea";
import InputSelect from "../../components/form/InputSelect";
import { counterOptions, roleOptions } from "../../layout/config";

const ProfileEditComponent = () => {
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
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
        <p className="text-2xl font-semibold">
          Edit Counter{" "}
        </p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">
            Counter 
          </p>{" "}
          <p className="py-2 px-4">Edit Counter</p>
        </div>
      </div>
      <div className="bg-white rounded-t-[10px] flex flex-col items-start p-6 space-y-6">
       <div className="flex flex-col space-y-4">
          <p className="text-2xl font-medium">Change Information</p>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Counter Name</p>
            <div className="w-[528px]">
              <InputField
                name="name"
                control={control}
                label={""}
                value={"Lashio_Branch_Counter1"}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">City Branch</p>
            <div className="w-[528px]">
              <InputSelect
                label={"Select your branch"}
                fullWidth
                name="branch"
                control={control}
                options={counterOptions}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Counter Phone</p>
            <div className="w-[528px]">
              <InputField
                name="phone"
                control={control}
                label={""}
                value={"09976666666, 09976666666"}
              />
            </div>
          </div>
                  </div>
      </div>
      <div className="bg-white rounded-b-[10px] flex flex-col items-start p-6 space-y-6">
        <div className="flex flex-col space-y-4">
          <p className="text-2xl font-medium">Change Address</p>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Current Address
            </p>
            <div className="w-[528px]">
              <MuiTextarea
                name="current_address"
                control={control}
                placeholder="Enter Current Address"
                rows={3.5}
                label={""}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Block</p>
            <div className="w-[528px]">
              <InputSelect
                fullWidth
                name="block"
                control={control}
                label={""}
                options={counterOptions}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Region Type
            </p>
            <div className="w-[528px]">
              <InputSelect
                fullWidth
                name="region"
                control={control}
                label={""}
                options={counterOptions}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Address Detail
            </p>
            <div className="w-[528px]">
              <MuiTextarea
                name="address_detail"
                control={control}
                placeholder="Enter New Address"
                rows={2.5}
                label={""}
              />
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

export default ProfileEditComponent;
