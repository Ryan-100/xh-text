import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { counterOptions, roleOptions } from "../../../layout/config";
import InputField from "../../../components/form/InputFiled";

const HelpCenterEdit = () => {
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
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
          <p className="text-2xl font-semibold">Edit Help Center</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
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
              name="city"
              control={control}
              label={""}
              options={counterOptions}
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
          <p className="text-sm md:text-base xl:text-xl text-gray">Facebook</p>
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
              name="viber"
              control={control}
              placeholder="Enter your Viber link"
              label={""}
            />
          </div>
        </div>
        <div className="flex items-start justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">Telegram</p>
          <div className="w-[528px]">
            <InputField
              name="telegram"
              control={control}
              placeholder="Enter your Telegram link"
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
      <div className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
        <Icon name="save" width={24} height={24} />
        <p className="text-[20px] text-white">Save Updates</p>
      </div>
    </div>
  );
};

export default HelpCenterEdit;
