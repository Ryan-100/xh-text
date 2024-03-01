import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { roleOptions } from "../../../layout/config";
import { Divider } from "@mui/material";

const History = () => {
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const NotificationHistory = [
    {
      id: 1,
      date: "11 Sep 2023, 11:00:00 AM",
      title: "System Maintenance Alert",
      description:
        "Our mobile app is undergoing scheduled maintenance on 5 Sep 2023, Sunday, from 22:00 hour to 23:00 hour . GMT.",
      notice: "",
    },
    {
      id: 12,
      date: "11 Sep 2023, 11:00:00 AM",
      title: "System Maintenance Alert",
      description:
        "Our mobile app is undergoing scheduled maintenance on 5 Sep 2023, Sunday, from 22:00 hour to 23:00 hour . GMT.",
      notice: "During this period, creating parcel is unavailable.",
    },
  ];

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
          <p className="text-2xl font-semibold">Notification History</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Settings</p>
          <p className="py-2 px-2">Notification History</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="fldivflex-col space-y-1 w-[528px]">
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
        <div className="fldivflex-col space-y-1 w-[528px]">
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
      </div>
      <div className="w-full bg-white rounded-[10px] flex flex-col">
        {NotificationHistory.map((data,i) => (
          <>
            <div className="flex flex-col space-y-2 p-6">
              <p className="text-xl font-semibold">{data.title}</p>
              <p className="text-xl">{data.description}</p>
              <p className="text-xl text-gray">{data.notice && data.notice}</p>
              <p className="text-base text-gray">{data.date}</p>
            </div>
            {i!== NotificationHistory.length - 1 && <Divider/>}
          </>
        ))}
      </div>
    </div>
  );
};

export default History;
