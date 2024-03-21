import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { counterOptions } from "../../../layout/config";
import InputField from "../../../components/form/InputFiled";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageData } from "../../../service/auth";
import { HelpCenterInterface, help } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const HelpCenterCreate = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { all_cities } = useSelector((state: any) => state.city);

  const user_id = getLocalStorageData("user_id");

  const createHelpCenter = async (data: HelpCenterInterface) => {
    const res = await dispatch(help.createHelpCenter(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
      setValue("hotline_phone", "");
      setValue("address", "");
      setValue("email", "");
      setValue("time", "");
      setValue("facebook", "");
      setValue("youtube", "");
      setValue("viber_phone", "");
      setValue("telegram_phone", "");
    }
  };

  const cityOptions = all_cities
    ? all_cities?.data?.map((city) => ({
        value: city.id,
        label: city.city_eng,
      }))
    : [];

  const onSubmit = (data) => {
    const {
      city_id,
      hotline_phone,
      address,
      email,
      time,
      facebook,
      youtube,
      viber_phone,
      telegram_phone,
    } = data;
    if (
      city_id &&
      hotline_phone &&
      address &&
      email &&
      time &&
      facebook &&
      youtube &&
      viber_phone &&
      telegram_phone
    ) {
      createHelpCenter({
        city_id,
        hotline_phone,
        address,
        email,
        time,
        facebook,
        youtube,
        viber_phone,
        telegram_phone,
        // created_by: user_id,
      });
    } else {
      setNotFilled(true);
    }
  };
  const goBack = () => {
    navigate(-1);
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
            <p className="title">Create Help Center</p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Help Center
            </p>
            <p className="py-2 px-2">Create Help Center</p>
          </div>
        </div>

        <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
          <p className="text-2xl text-black">Center Information</p>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">City</p>
            <div className="w-[528px]">
              <InputSelect
                fullWidth
                name="city_id"
                control={control}
                label={"Choose city"}
                options={cityOptions}
              />
            </div>
          </div>

          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Phone</p>
            <div className="w-[528px]">
              <InputField
                name="hotline_phone"
                control={control}
                placeholder="Enter your phone"
                label={""}
              />
            </div>
          </div>
          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Address</p>
            <div className="w-[528px]">
              <InputField
                name="address"
                control={control}
                placeholder="Enter your address"
                label={""}
              />
            </div>
          </div>
          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Email</p>
            <div className="w-[528px]">
              <InputField
                name="email"
                control={control}
                placeholder="Enter your email"
                label={""}
              />
            </div>
          </div>
          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Time</p>
            <div className="w-[528px]">
              <InputField
                name="time"
                control={control}
                placeholder="Eg. 9:00AM - 5:00PM"
                label={""}
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
          <p className="text-2xl text-black">Social Information</p>

          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Facebook
            </p>
            <div className="w-[528px]">
              <InputField
                name="facebook"
                control={control}
                placeholder="Enter your phone"
                label={""}
              />
            </div>
          </div>
          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Viber</p>
            <div className="w-[528px]">
              <InputField
                name="viber_phone"
                control={control}
                placeholder="Enter your Viber Phone"
                label={""}
              />
            </div>
          </div>
          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Telegram
            </p>
            <div className="w-[528px]">
              <InputField
                name="telegram_phone"
                control={control}
                placeholder="Enter your Telegram Phone"
                label={""}
              />
            </div>
          </div>
          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">YouTube</p>
            <div className="w-[528px]">
              <InputField
                name="youtube"
                control={control}
                placeholder="Enter your YouTube link"
                label={""}
              />
            </div>
          </div>
        </div>
        <button className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
          <Icon name="add" width={24} height={24} />
          <p className="btn-lg">Create</p>
        </button>
      </form>
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New help center has been created successfully."}
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

export default HelpCenterCreate;
