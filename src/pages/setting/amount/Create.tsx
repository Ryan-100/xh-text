import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/form/Button";
import InputSelect from "../../../components/form/InputSelect";
import { useNavigate } from "react-router-dom";
import MUIinput from "../../../components/form/MUIinput";
import { counterOptions, currencyOptions, parcelOptions, weightOptions } from "../../../layout/config";



const Create = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      // Specify your default values here
      city: "",
      parcel: "",
      weight: "",
      currency: "",
    },
  });

  const goBack = () => {
    navigate("/setting/amount");
  };
  return (
    <form className="w-full flex flex-col items-center justify-center">
      <div className="w-[260px] md:w-[460px] flex flex-col items-center space-y-4">
        <p className="font-bold text-lg my-3 self-start">Creat amount list</p>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            City
          </p>
          <div className="w-2/3">
            <InputSelect
              label="Select City"
              name="city"
              control={control}
              options={counterOptions}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            Parcel Type
          </p>
          <div className="w-2/3">
            <InputSelect
              label="Select parcel type"
              name="parcel"
              control={control}
              options={parcelOptions}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            Weight
          </p>
          <div className="w-2/3">
            <InputSelect
              label="Select weight"
              name="weight"
              control={control}
              options={weightOptions}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            Amount
          </p>
          <div className="w-2/3">
            <MUIinput
              label="Enter amount"
              name="amount"
              control={control}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            Currency
          </p>
          <div className="w-2/3">
            <InputSelect
              label="Select currency"
              name="currency"
              control={control}
              options={currencyOptions}
              fullWidth
            />
          </div>
        </div>
        <div className=" w-full flex self-start items-center justify-between">
          <div className="deleteButton" onClick={goBack}>
            Back
          </div>
          <Button className="">Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default Create;
