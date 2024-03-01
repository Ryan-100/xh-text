import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { currencyOptions } from "../../../layout/config";
import InputField from "../../../components/form/InputFiled";

const CreateCity = () => {
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
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
          <p className="text-2xl font-semibold">Edit Branch</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Branch</p>
          <p className="py-2 px-2">Edit Branch</p>
        </div>
      </div>
      <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">
            Branch Name
          </p>
          <div className="w-[528px]">
            <InputField
              name="branch"
              control={control}
              label={""}
              placeholder="Enter Branch Name"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">Prefix</p>
          <div className="w-[528px]">
            <InputField
              name="prefix"
              control={control}
              label={""}
              placeholder="Enter Prefix"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">Currency</p>
          <div className="w-[528px]">
            <InputSelect
              fullWidth
              name="weight"
              control={control}
              label={""}
              options={currencyOptions}
            />
          </div>
        </div>
      </div>
      <div className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
        <Icon name="save" width={24} height={24} />
        <p className="text-[20px] text-white">Save Updates</p>
      </div>
    </div>
  );
};

export default CreateCity;
