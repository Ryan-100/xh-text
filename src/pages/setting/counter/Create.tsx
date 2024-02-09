import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/form/Button";
import InputSelect from "../../../components/form/InputSelect";
import { useNavigate } from "react-router-dom";
import MUIinput from "../../../components/form/MUIinput";
import {
  counterOptions,
} from "../../../layout/config";

const Create = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      // Specify your default values here
      counter: "",
      city: "",
      block:"",
      region:"",
    },
  });

  const goBack = () => {
    navigate("/setting/counters");
  };
  return (
    <form className="w-full flex flex-col items-center justify-center">
      <div className="w-[260px] md:w-[460px] flex flex-col items-center space-y-4">
        <p className="font-bold text-lg my-3 self-start">Creat counter</p>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Counter name</p>
          <div className="w-2/3">
            <MUIinput
              label="Enter counter name"
              name="counter"
              control={control}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Region</p>
          <div className="w-2/3">
          <InputSelect
              label="Select region"
              name="region"
              control={control}
              options={counterOptions}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Block</p>
          <div className="w-2/3">
          <InputSelect
              label="Select Block"
              name="block"
              control={control}
              options={counterOptions}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">City</p>
          <div className="w-2/3">
            <InputSelect
              label="Select city"
              name="city"
              control={control}
              options={counterOptions}
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
