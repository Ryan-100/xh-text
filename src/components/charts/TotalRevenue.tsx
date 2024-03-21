import ReactApexChart from "react-apexcharts";
import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

const TotalRevenue = () => {
  return (
    <div className="p-4 flex-1 bg-gray-100 rounded-lg">
      <h2 className="title text-blue-900">Total Revenue</h2>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={TotalRevenueOptions}
      />
    </div>
  );
};

export default TotalRevenue;
