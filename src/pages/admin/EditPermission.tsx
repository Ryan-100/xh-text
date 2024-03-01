import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Icon from "../../icons";
import InputField from "../../components/form/InputFiled";
import MuiTextarea from "../../components/form/TextArea";
import InputSelect from "../../components/form/InputSelect";
import {
  counterOptions,
  permissionData,
  roleOptions,
} from "../../layout/config";
import MUICheckbox from "../../components/form/Checkbox";

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
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <p className="text-2xl font-semibold">
          Edit Permission{" "}
          <span className="text-gray">(Admin ID : SuperAdmin_HHW)</span>
        </p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-4 border-r border-r-gray text-gray">
            Admin Detail
          </p>{" "}
          <p className="py-2 px-4">Edit Permission</p>
        </div>
      </div>
      <div className="bg-white rounded-t-[10px] flex flex-col items-start p-6 space-y-6 w-full">
        <div className="grid grid-cols-3 grid-rows-5 gap-2 w-full">
          {permissionData.map((data, i) => (
            <MUICheckbox key={i} name={data} control={control} label={data} />
          ))}
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
