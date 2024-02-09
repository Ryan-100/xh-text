import ReactApexChart from "react-apexcharts";
import { TotalUserOptions, TotalUserSeries } from "./chart.config";

const TotalUser = () => {
  return (
    <div className="p-4 flex-1 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-900">Total Users</h2>
      <ReactApexChart
        series={TotalUserSeries}
        type="line"
        height={310}
        options={TotalUserOptions}
      />
    </div>
  );
};

export default TotalUser;
