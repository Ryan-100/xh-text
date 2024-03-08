import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import MuiTextarea from "../../../components/form/TextArea";
import { applicationType } from "./History";
import moment from "moment";
import { useDispatch } from "react-redux";
import AlertModal from "../../../components/Modal/AlertModal";
import { SystemNotificationData, notification } from "../../../store/actions";

const RiderReportDetail = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setValue("send_type", "userApp");
  }, []);

  const sendNotification = async (data: SystemNotificationData) => {
    const res = await dispatch(notification.sendSytemNotification(data) as any);
    console.log(res)
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setValue("title", "");
      setValue("message", "");
    }
  };

  const onSubmit = (data) => {
    if (data.send_type && data.title && data.message) {
      const notiData = {
        send_type: data.send_type,
        noti_type: "system",
        customer_id: "3a67c960-f748-42b8-9aa6-030f393fca21",
        image_url: "https://avatars.githubusercontent.com/u/145317987?s=48&v=4",
        title: data.title,
        message: data.message,
      };
      sendNotification(notiData);
    } else {
      setNotFilled(true);
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const goToHistory = () => {
    navigate("history");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="flex justify-between items-center">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">Notification</p>
          </div>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Notification</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex text-base">
            <p className="text-secondary leading-6">Date & Time : </p>
            <p className="text-gray leading-6">
              {moment(new Date()).format("D MMM YYYY, h:mm a")}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div
              onClick={goToHistory}
              className="self-start cursor-pointer rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
            >
              <Icon name="history" width={24} height={24} />
              <p className="text-[20px] text-white">History</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Sent To</p>
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

          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Title</p>
            <div className="w-[528px]">
              <InputField
                name="title"
                control={control}
                label={""}
                placeholder="Enter Title Message"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Body</p>
            <div className="w-[528px]">
              <MuiTextarea
                name="message"
                control={control}
                placeholder="Enter Message"
                rows={3.5}
                label={""}
              />
            </div>
          </div>
        </div>
        <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
          <Icon name="success" width={24} height={24} />
          <p className="text-[20px] text-white">Send</p>
        </button>
      </form>
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"The notification has been sent successfully."}
      />
      <AlertModal
        open={notFilled}
        onClose={() => setNotFilled(false)}
        title={"Alert"}
        body={"Kindly fill all fields with the necessary information."}
      />
    </>
  );
};

export default RiderReportDetail;
