import React from "react";
import ReactApexChart from "react-apexcharts";
import { TotalEarningOptions, TotalIncomeSeries } from "./chart.config";

const TotalEarning = () => {
  return (
    <div className="bg-white w-[344px] h-[272px] p-6 flex flex-col rounded-[20px]">
      <div className="flex flex-col">
        <p className="text-3.5xl font-medium">
          10,000,000 <span className="text-gray-light">Ks</span>{" "}
        </p>
        <p className="">Today Earnings</p>
      </div>
      <ReactApexChart
        series={TotalIncomeSeries}
        type="area"
        height={158}
        width={296}
        options={TotalEarningOptions}
      />
    </div>
  );
};

export default TotalEarning;
