import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { counterOptions, roleOptions } from "../../../layout/config";
import MuiTextarea from "../../../components/form/TextArea";
import InputField from "../../../components/form/InputFiled";

const CurrencyCreate = () => {
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
          <p className="title">Create Currency</p>
        </div>
        <div className="side-title  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Currency</p>
          <p className="py-2 px-2">Create Currency</p>
        </div>
      </div>
      <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">Branch</p>
          <div className="w-[528px]">
            <InputSelect
              fullWidth
              name="branch"
              control={control}
              label={""}
              options={counterOptions}
            />
          </div>
        </div>

        <div className="flex items-start justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">Currency</p>
          <div className="w-[528px]">
            <InputField
              name="currency"
              control={control}
              placeholder="E.g Ks, ¥ "
              label={""}
            />
          </div>
        </div>
      </div>
      <div className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
        <Icon name="add" width={24} height={24} />
        <p className="btn-lg">Create</p>
      </div>
    </div>
  );
};

export default CurrencyCreate;
