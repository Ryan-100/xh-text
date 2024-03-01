import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import { useForm } from "react-hook-form";
import InputSelect from "../../../components/form/InputSelect";
import { roleOptions } from "../../../layout/config";
import InputField from "../../../components/form/InputFiled";

const EditWeight = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { control } = useForm();

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
        <p className="text-2xl font-semibold">Edit Weight</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Weight</p>{" "}
          <p className=" py-2 px-2">Edit Weight</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
        <div className="flex space-x-6 justify-start w-full ">
          <div className="flex flex-col space-y-4 w-[780px]">
            <div className="h-12 w-full py-3 px-4 flex items-center ">
              <p className="text-gray w-[252px] text-xl">Parcel Type</p>
              <div className="w-[528px]">
                <InputField
                  name="amount"
                  type="number"
                  control={control}
                  label={""}
                  placeholder="Enter Weight"
                  endPrefix="KG"
                />
              </div>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center mb-6">
              <p className="text-gray w-[252px] text-xl">State</p>
              <p className="text-secondary w-[252px] text-xl">Default</p>
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

export default EditWeight;
