import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/form/Button";
import InputSelect from "../../../components/form/InputSelect";
import { useNavigate } from "react-router-dom";
import { parcelOptions } from "../../../layout/config";



const Create = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      // Specify your default values here
      parcel: "",

    },
  });

  const goBack = () => {
    navigate("/setting/parcel-type");
  };
  return (
    <form className="w-full flex flex-col items-center justify-center">
      <div className="w-[260px] md:w-[460px] flex flex-col items-center space-y-4">
        <p className="font-bold text-lg my-3 self-start">Creat parcel type</p>
      
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
