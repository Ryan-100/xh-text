import React from "react";
import ReactApexChart from "react-apexcharts";
import { CustomerParcelOptions, CustomerParcelSeries } from "./chart.config";

const TotalParcel = () => {
  const [daily, setDaily] = React.useState(true);
  const [monthly, setMonthly] = React.useState(false);
  const [yearly, setYearly] = React.useState(false);

  const activeButton = `bg-primary text-white w-[109px] h-8 flex items-center justify-center text-center font-normal rounded-md cursor-pointer`;
  const inactiveButton = `bg-gray-light-1 text-secondary w-[109px] h-8 flex items-center justify-center text-center font-normal cursor-pointer`;

  const dailyHandler = () => {
    setDaily(true);
    setMonthly(false);
    setYearly(false);
  };

  const monthlyHandler = () => {
    setMonthly(true);
    setDaily(false);
    setYearly(false);
  };

  const yearlyHandler = () => {
    setMonthly(false);
    setDaily(false);
    setYearly(true);
  };
  return (
    <div className="card overflow-hidden w-full">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <p className="font-medium text-2xl">
            No. of Parcels <span className="text-base text-gray"> (Max : <span className='text-secondary'> 100 </span>/ day)</span>
          </p>
          <div className="flex space-x-2 items-center">
            <div className="w-4 h-4 rounded-full bg-blue-light" />
            <p className="text-2xl font-medium">Riders</p>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="w-4 h-4 rounded-full bg-green" />
            <p className="text-2xl font-medium">Delivered Parcels</p>
          </div>
        </div>
        <div className="bg-gray-light-1 flex items-center w-[335px] h-10 rounded-[10px] overflow-hidden">
          <div
            className={daily ? activeButton : inactiveButton}
            onClick={dailyHandler}
          >
            Daily
          </div>
          <div
            className={monthly ? activeButton : inactiveButton}
            onClick={monthlyHandler}
          >
            Monthly
          </div>

          <div
            className={yearly ? activeButton : inactiveButton}
            onClick={yearlyHandler}
          >
            Yearly
          </div>
        </div>
      </div>
      <ReactApexChart
        series={CustomerParcelSeries}
        type="line"
        height={300}
        options={CustomerParcelOptions}
      />
    </div>
  );
};

export default TotalParcel;
