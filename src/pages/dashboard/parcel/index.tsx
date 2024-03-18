import React from "react";
import { useDispatch } from "react-redux";
import CustomerParcel from "../../../components/charts/TotalParcel";
import BarGroup from "../../../components/charts/BarGroup";

const ParcelDashboard = () => {
  const [chartFilter, setChartFilter] = React.useState("all");
  const dispatch = useDispatch();
  const PickupParcelData = {
    name: "Pickup Parcels ",
    count: "3.2M",
    data: [
      { name: "Lashio", count: "50" },
      { name: "Muse", count: "30" },
      { name: "Mandalay", count: "20" },
    ],
  };
  const DeliveryParcelData = {
    name: "Delivery Parcels",
    count: "7.5M",
    data: [
      { name: "Lashio", count: "70" },
      { name: "Muse", count: "30" },
      { name: "Mandalay", count: "20" },
    ],
  };
  const AnonymousParcelData = {
    name: "Anonymous Parcels",
    count: "7.5M",
    data: [
      { name: "Lashio", count: "70" },
      { name: "Muse", count: "30" },
      { name: "Mandalay", count: "20" },
    ],
  };

  const activeButton = `buttonPrimary !px-4 !py-[10px]`;
  const inactiveButton = `buttonOutlined !px-4 !py-[10px]`;

  const allHandler = () => {
    setChartFilter("all");
  };

  const lashioHandler = () => {
    setChartFilter("lashio");
  };

  const museHandler = () => {
    setChartFilter("muse");
  };

  const mandalayHandler = () => {
    setChartFilter("mandalay");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <BarGroup data={PickupParcelData} />
        <BarGroup data={DeliveryParcelData} />
        <BarGroup data={AnonymousParcelData} />
      </div>
      <div className="flex items-center space-x-4">
        <div
          className={chartFilter === "all" ? activeButton : inactiveButton}
          onClick={allHandler}
        >
          All Branches
        </div>
        <div
          className={chartFilter === "lashio" ? activeButton : inactiveButton}
          onClick={lashioHandler}
        >
          Lashio
        </div>
        <div
          className={chartFilter === "muse" ? activeButton : inactiveButton}
          onClick={museHandler}
        >
          Muse
        </div>
        <div
          className={chartFilter === "mandalay" ? activeButton : inactiveButton}
          onClick={mandalayHandler}
        >
          Mandalay
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <CustomerParcel />
      </div>
    </div>
  );
};

export default ParcelDashboard;
