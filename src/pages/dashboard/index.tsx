import TotalIncome from "../../components/charts/TotalIncome";
import Widget from "../../components/widget";
import { useDispatch, useSelector } from "react-redux";
import { emit } from "../../store/actions";
import { useEffect } from "react";
import { RootState } from "../../store/reducers/root";
import { getToken } from "../../service/auth";
import CustomerParcel from "../../components/charts/CustomerParcel";
const Dashbaord = () => {
  const token = getToken();
  console.log(token, "dashbboard token");
  const { page } = useSelector((state: RootState) => state.emit);
  console.log(page, "page");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emit("PAGE_NAME_CHANGE", "dashboard"));
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
        <Widget type="admin" />
        <Widget type="order" />
        <Widget type="earning" />
      </div>
      <div className="grid grid-cols-1 gap-6 ">
        <TotalIncome />
        <CustomerParcel />
      </div>
    </div>
  );
};

export default Dashbaord;
