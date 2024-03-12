import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { AmountType, amount } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";
import { getLocalStorageData } from "../../../service/auth";

const AmountCreate = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { control,handleSubmit,setValue } = useForm({ mode: "onChange" });

  const { all_cities } = useSelector((state: any) => state.city);
  const { all_currency } = useSelector((state: any) => state.currency);
  const { all_weight } = useSelector((state: any) => state.weight);
  const user_id = getLocalStorageData("user_id")

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

  const createAmount = async (data:AmountType) => {
    const res = await dispatch(amount.createAmount(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false)
      setValue("delivery_fee", 0);
    }
  };

  const onSubmit = ({from_city_id,to_city_id,currency_id,weight_id,delivery_fee}) =>{
    if(from_city_id && to_city_id && currency_id && weight_id && delivery_fee){
      createAmount({
        from_city_id,
        to_city_id,
        currency_id,
        weight_id,
        delivery_fee:parseInt(delivery_fee),
        parcel_type_id:"11ca9396-176a-47ef-b816-0565584f9c85",
        created_by:user_id,
      })
    }else{
      setNotFilled(true);
    }
  }

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {cityOptions && currencyOptions && weightOptions && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
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
                  name="from_city_id"
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
                  name="to_city_id"
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
                  name="weight_id"
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
                  name="currency_id"
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
          <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
            <Icon name="add" width={24} height={24} />
            <p className="text-[20px] text-white">Create</p>
          </button>
        </form>
      )}
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"Amount Delivery Fee has been sent successfully."}
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

export default AmountCreate;
