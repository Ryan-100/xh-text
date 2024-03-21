import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import { useForm } from "react-hook-form";
import MuiTextarea from "../../../components/form/TextArea";

const AdminRoleEdit = () => {
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
        <p className="title">Edit Permission</p>
        <div className="side-title  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">
            Permission
          </p>
          <p className=" py-2 px-2">Edit Permission</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6 h-fit">
        <div className="flex space-x-6 justify-start w-full h-full">
          <div className="flex flex-col space-y-4 w-[780px]">
            <div className="h-12 w-full py-3 px-4 flex items-center">
              <p className="text-gray w-[252px] text-xl">Branch</p>
              <p className="text-secondary w-[252px] text-xl">Lashio_Branch</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-start ">
              <p className="text-gray w-[252px] text-xl">Counter</p>
              <p className="text-secondary w-[252px] text-xl">
                Lashio_Branch_Counter1
              </p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-start ">
              <p className="text-gray w-[252px] text-xl">Role</p>
              <p className="text-secondary w-[252px] text-xl">
                Lashio_Branch_Counter1
              </p>
            </div>
            <div className="h-fit w-full py-3 px-4 flex items-start mb-6">
              <p className="text-gray w-[252px] text-xl">Permission</p>
              <div className="w-[528px]">
                <MuiTextarea
                  name="permission"
                  control={control}
                  placeholder="Enter Permission Name"
                  rows={2.5}
                  label={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
        <Icon name="save" width={16} height={16} />
        <p className="btn-lg">Save Updates</p>
      </div>
    </div>
  );
};

export default AdminRoleEdit;
