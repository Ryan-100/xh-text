import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import moment from "moment";
import Datepicker from "react-tailwindcss-datepicker";
import { notification } from "../../../store/actions";
import { routeFilter } from "../../../utils";

export const applicationType = [
  { value: "userApp", label: "User Application" },
  { value: "counterApp", label: "Counter Application" },
  { value: "riderApp", label: "Rider Application" },
];

const History = () => {
  const [data, setData] = React.useState<any[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = React.useState({
    startDate: null,
    endDate: null,
  });
  const { control, watch } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const send_type = watch("send_type");

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const goBack = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchCounters = async () => {
      try {
        const res = await dispatch(
          notification.getSystemNotificationHistory() as any
        );
        console.log(res,"noti")

        setData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    const fetchCountersByFilter = async (params) => {
      try {
        const res = await dispatch(
          notification.getSystemNotificationHistoryByFilter(params) as any
        );
        console.log(res,"noti")

        setData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    //fetch system notification list according to filter
    if (send_type && value.startDate && value.endDate) {
      fetchCountersByFilter({
        filter_type: send_type,
        from_date: new Date(value.startDate).toISOString(),
        to_date: new Date(value.endDate).toISOString(),
      });
      setSearchParams({
        filter_type: send_type,
        from_date: new Date(value.startDate).toISOString(),
        to_date: new Date(value.endDate).toISOString(),
      });
    } else {
      fetchCounters();
      setSearchParams();
    }
  }, [dispatch, send_type]);

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
      <div className="flex w-full items-center space-x-6">
        <div className="w-[528px]">
          <div className="w-[528px]">
            <InputSelect
              fullWidth
              name="send_type"
              control={control}
              label={"Choose application type"}
              options={applicationType}
            />
          </div>
        </div>
        <div className="w-[528px]">
          <Datepicker
            value={value}
            onChange={handleValueChange}
            primaryColor="orange"
            showShortcuts
            inputClassName="h-12 w-full placeholder:text-base outline-none border border-gray-light rounded-[10px] pl-6"
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-[10px] flex flex-col">
        {data &&
          data.length > 0 &&
          data.map((data, i) => (
            <>
              <div className="flex flex-col space-y-2 p-6">
                <p className="text-xl font-semibold">
                  {data.title && data.title}
                </p>
                <p className="text-xl">{data.message && data.message}</p>
                <p className="text-xl text-gray">
                  {data.notice && data.notice}
                </p>
                <p className="text-base text-gray">
                  {data.created_at &&
                    moment(data.created_at).format("D MMM YYYY, h:mm a")}
                </p>
              </div>
              {i !== data.length - 1 && <Divider />}
            </>
          ))}
      </div>
    </div>
  );
};

export default History;
