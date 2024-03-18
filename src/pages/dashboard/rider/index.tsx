import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerParcel from "../../../components/charts/TotalParcel";
import BarGroup from "../../../components/charts/BarGroup";
import { useForm } from "react-hook-form";
import InputSelect from "../../../components/form/InputSelect";

const RiderDashboard = () => {
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
    name: "Total Riders",
    count: "50",
    data: [
      { name: "Lashio", count: "30" },
      { name: "Muse", count: "15" },
      { name: "Mandalay", count: "5" },
    ],
  };
  const DeliveryParcelData = {
    name: "Avg Delivered_Parcels / Day",
       data: [
      { name: "Lashio", count: "70" },
      { name: "Muse", count: "30" },
      { name: "Mandalay", count: "20" },
    ],
  };
  const AnonymousParcelData = {
    name: "Avg Scanned_Parcels / Day",
       data: [
      { name: "Lashio", count: "70" },
      { name: "Muse", count: "30" },
      { name: "Mandalay", count: "20" },
    ],
  };


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <BarGroup data={PickupParcelData} />
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
        <CustomerParcel />
      </div>
    </div>
  );
};

export default RiderDashboard;
