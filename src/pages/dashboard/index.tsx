import TotalIncome from "../../components/charts/TotalIncome";
import { useDispatch } from "react-redux";

import CustomerParcel from "../../components/charts/TotalParcel";
import Progress from "../../components/charts/Progress";
import TotalEarning from "../../components/charts/TotalEarning";
const Dashbaord = () => {
  const dispatch = useDispatch();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TotalEarning />
        <div className="bg-white col-span-1  w-[344px] h-[272px] p-6 flex flex-col justify-start space-y-6 rounded-[20px]">
          <Progress color="#9DE3C0" name={"Total Customers"} progress={10} />
          <Progress color="#FFA8FC" name={"Total Admins"} progress={60} />
        </div>
        <div className="bg-white w-[344px] h-[272px] p-6 flex flex-col justify-start space-y-6 rounded-[20px]">
          <Progress color="#78C5FC" name={"Total Parcels"} progress={20} />
          <Progress color="#F69C9C" name={"Total Riders"} progress={90} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 ">
        <TotalIncome />
        <CustomerParcel />
      </div>
    </div>
  );
};

export default Dashbaord;
