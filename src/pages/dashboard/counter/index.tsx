import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerParcel from "../../../components/charts/TotalParcel";
import BarGroup from "../../../components/charts/BarGroup";
import { Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import InputSelect from "../../../components/form/InputSelect";
import ScannedParcel from "../../../components/charts/ScannedParcel";

const CounterDashboard = () => {
  const dispatch = useDispatch();
  const { control } = useForm();

  const { all_counters } = useSelector((state: any) => state.counter);

  const counterOptions = all_counters
    ? all_counters?.data?.map((counter) => ({
        value: counter.id,
        label: counter.name,
      }))
    : [];

  const PickupParcelData = {
    name: "Total Branches ",
    count: "3",
    data: [
      { name: "China Branch", count: "50" },
      { name: "Lashio Branch", count: "30" },
      { name: "Muse Branch", count: "20" },
    ],
  };
  const DeliveryParcelData = {
    name: "Total Counters",
    count: "7.5M",
    data: [
      { name: "Lashio", count: "70" },
      { name: "Muse", count: "30" },
      { name: "Mandalay", count: "20" },
    ],
  };
  const AnonymousParcelData = {
    name: "Total Admins",
    count: "7.5M",
    data: [
      { name: "Lashio", count: "70" },
      { name: "Muse", count: "30" },
      { name: "Mandalay", count: "20" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div className="bg-white col-span-1  w-[344px] h-[333px] p-6 flex flex-col justify-start space-y-6 rounded-[20px]">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-medium">{PickupParcelData.name}</p>
            <p className="text-2xl font-medium text-primary">
              {PickupParcelData.count}
            </p>
          </div>
          <div className="space-y-4">
            <Divider />
            {PickupParcelData.data.map((item, i) => (
              <p className="" key={i}>
                {item.name}
              </p>
            ))}
          </div>
        </div>
        <BarGroup data={DeliveryParcelData} />
        <BarGroup data={AnonymousParcelData} />
      </div>
      <div className="w-[528px]">
        <InputSelect
          fullWidth
          name="counter_id"
          control={control}
          label={"Choose counter name"}
          options={counterOptions}
        />
      </div>
      <div className="w-full overflow-hidden">
        <ScannedParcel />
      </div>
    </div>
  );
};

export default CounterDashboard;
