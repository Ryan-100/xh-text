import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { roleOptions } from "../../../layout/config";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { notification } from "../../../store/actions/notification.action";
import moment from "moment";
import Datepicker from "react-tailwindcss-datepicker";

export const applicationType = [
  { value: "userApp", label: "User Application" },
  { value: "counterApp", label: "Counter Application" },
  { value: "riderApp", label: "Rider Application" },
]

const History = () => {
  const [data, setData] = React.useState<any[]>();
  const [value, setValue] = React.useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
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
        setData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCounters();
  }, [dispatch]);

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
              defaultValue="userApp"
              label={""}
              options={applicationType}
            />
          </div>
        </div>
        <div className="w-[528px]">
          <Datepicker value={value} onChange={handleValueChange} primaryColor="orange" showShortcuts inputClassName="h-12 w-full outline-none border border-gray-light rounded-[10px] pl-6" />
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
