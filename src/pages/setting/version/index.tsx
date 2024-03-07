import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import MuiTextarea from "../../../components/form/TextArea";
import MUIRadioGroup from "../../../components/form/InputRadio";
import { versionApp, versionPlatform } from "../../../utils/enum";
import { useDispatch } from "react-redux";
import { AppVersionData, version } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const RiderReportDetail = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, setValue, handleSubmit } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setValue("app_name", "user");
    setValue("platform", "android");
  }, []);

  const sendNotification = async (data: AppVersionData) => {
    const res = await dispatch(version.sendAppVersion(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setValue("version", "");
      setValue("link", "");
    }
  };

  const onSubmit = (data: AppVersionData) => {
    if (
      data.app_name &&
      data.platform &&
      data.version &&
      data.link &&
      data.is_force_update
    ) {
      sendNotification({
        app_name: data.app_name,
        platform: data.platform,
        version: data.version,
        link: data.link,
        is_force_update: data.is_force_update,
      });
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
            <p className="text-2xl font-semibold">Application Version</p>
          </div>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Application Version</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex">
            <p className="text-secondary leading-6">Date & Time : </p>
            <p className="text-gray leading-6"> 5 Sep 2023, 1:00:00 PM</p>
          </div>
          <div className="flex items-center space-x-6">
            <div
              onClick={goToHistory}
              className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
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
                name="app_name"
                control={control}
                defaultValue="user"
                label={""}
                options={versionApp}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Platform
            </p>
            <div className="w-[528px]">
              <InputSelect
                fullWidth
                name="platform"
                control={control}
                label={""}
                defaultValue="android"
                options={versionPlatform}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Version</p>
            <div className="w-[528px]">
              <InputField
                name="version"
                control={control}
                label={""}
                placeholder="E.g Ver 3.2.1"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Version Link
            </p>
            <div className="w-[528px]">
              <MuiTextarea
                name="link"
                control={control}
                placeholder="Enter Link"
                rows={3.5}
                label={""}
              />
            </div>
          </div>
          <div className="flex items-center w-fit">
            <p className="text-sm md:text-base xl:text-xl text-gray w-[262px]">
              Force Update
            </p>
            <div className="w-full flex-1">
              <MUIRadioGroup
                control={control}
                name="is_force_update"
                defaultValue={1}
                options={[
                  { label: "Yes", value: 1 },
                  { label: "No", value: 0 },
                ]}
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
        body={"Version Update has been sent successfully."}
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
