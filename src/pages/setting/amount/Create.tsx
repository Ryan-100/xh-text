import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useSelector } from "react-redux";

const AmountCreate = () => {
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const { all_cities } = useSelector((state: any) => state.city);
  const { all_currency } = useSelector((state: any) => state.currency);
  const { all_weight } = useSelector((state: any) => state.weight);

  const cityOptions = all_cities?.data?.map((city) => ({
    value: city.id,
    label: city.city_eng,
  }));
  const currencyOptions = all_currency?.data?.map((currency) => ({
    value: currency.id,
    label: currency.name,
  }));
  const weightOptions = all_weight?.data?.map((weight) => ({
    value: weight.id,
    label: weight.weight,
  }));

  console.log(weightOptions, all_weight,'weight')

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {cityOptions && currencyOptions && weightOptions && (
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
              <p className="text-2xl font-semibold">Create Amount</p>
            </div>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Amount
              </p>
              <p className="py-2 px-2">Create Amount</p>
            </div>
          </div>
          <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">From</p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="from_city"
                  control={control}
                  label={"Select Start Location"}
                  options={cityOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">To</p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="to_city"
                  control={control}
                  label={"Select End Location"}
                  options={cityOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Weight
              </p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="weight"
                  control={control}
                  label={"Select weight"}
                  options={weightOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Currency
              </p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="currency"
                  control={control}
                  label={"Select Currency"}
                  options={currencyOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Amount
              </p>
              <div className="w-[528px]">
                <InputField
                  name="delivery_fee"
                  type="number"
                  control={control}
                  label={""}
                  placeholder="Enter Amount"
                />
              </div>
            </div>
          </div>
          <div className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
            <Icon name="add" width={24} height={24} />
            <p className="text-[20px] text-white">Create</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AmountCreate;
