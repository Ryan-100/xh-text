import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";

const CurrencyDetail = () => {
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
        <p className="title">Currency Detail</p>
        <div className="side-title  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Currency</p>{" "}
          <p className=" py-2 px-2">Currency Detail</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <div
          onClick={goToEdit}
          className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 "
        >
          <Icon name="edit1" width={24} height={24} />
          <p className="btn-lg">Edit</p>
        </div>
      </div>
      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 drop-shadow">
        <div className="h-12 w-full flex items-center justify-start text-xl">
          <p className="text-gray w-[228px]">Notice</p>
          <p className="text-secondary w-fit">
            No responsibility for broken glass / material damage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDetail;
