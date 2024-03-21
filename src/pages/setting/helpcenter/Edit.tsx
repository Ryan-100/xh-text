import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useDispatch, useSelector } from "react-redux";
import { help } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const HelpCenterEdit = () => {
  const [helpCenter, setHelpCenter] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [notFilled, setNotFilled] = React.useState(false);

  const navigate = useNavigate();
  const { id: helpCenterId } = useParams();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const { all_cities } = useSelector((state: any) => state.city);

  React.useEffect(() => {
    const fetchCityDetail = async () => {
      try {
        const res = await dispatch(help.getHelpCenterById(helpCenterId) as any);
        setHelpCenter(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCityDetail();
  }, [dispatch, helpCenterId]);

  const updateHelpCenter = async (data) => {
    const res = await dispatch(
      help.updateHelpCenter(helpCenterId, data) as any
    );
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
    }
  };

  const cityOptions = all_cities
    ? all_cities?.data?.map((city) => ({
        value: city.id,
        label: city.city_eng,
      }))
    : [];

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    const {
      city_id = helpCenter?.city_id,
      hotline_phone=helpCenter?.hotline_phone,
      address=helpCenter?.address,
      email=helpCenter?.email,
      time=helpCenter?.time,
      facebook=helpCenter?.facebook,
      youtube=helpCenter?.youtube,
      viber_phone=helpCenter?.viber_phone,
      telegram_phone=helpCenter?.telegram_phone,
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
      updateHelpCenter({
        city_id,
        hotline_phone,
        address,
        email,
        time,
        facebook,
        youtube,
        viber_phone,
        telegram_phone,
      });
    } else {
      setNotFilled(true);
    }
  };
  return (
    <>
      {helpCenter && (
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
              <p className="title">Edit Help Center</p>
            </div>
            <div className="side-title  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Help Center
              </p>
              <p className="py-2 px-2">Edit Help Center</p>
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
                  defaultValue={helpCenter?.city_id}
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
                  defaultValue={helpCenter?.hotline_phone}
                  placeholder="Enter your phone"
                  label={""}
                />
              </div>
            </div>
            <div className="flex items-start justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Address
              </p>
              <div className="w-[528px]">
                <InputField
                  name="address"
                  defaultValue={helpCenter?.address}
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
                  defaultValue={helpCenter?.email}
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
                  defaultValue={helpCenter?.time}
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
                  defaultValue={helpCenter?.facebook}
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
                  defaultValue={helpCenter?.viber_phone}
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
                  defaultValue={helpCenter?.telegram_phone}
                  control={control}
                  placeholder="Enter your Telegram Phone"
                  label={""}
                />
              </div>
            </div>
            <div className="flex items-start justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                YouTube
              </p>
              <div className="w-[528px]">
                <InputField
                  name="youtube"
                  defaultValue={helpCenter?.youtube}
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
      )}
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"This help center has been edited successfully."}
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

export default HelpCenterEdit;
