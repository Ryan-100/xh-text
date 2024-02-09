import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/form/Button";
import { useNavigate } from "react-router-dom";
import MUIinput from "../../../components/form/MUIinput";



const Create = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      // Specify your default values here
      weight: "",
    },
  });

  const goBack = () => {
    navigate("/setting/weight");
  };
  return (
    <form className="w-full flex flex-col items-center justify-center">
      <div className="w-[260px] md:w-[460px] flex flex-col items-center space-y-4">
        <p className="font-bold text-lg my-3 self-start">Creat weight list</p>
     
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            Weight
          </p>
          <div className="w-2/3">
            <MUIinput
              label="Enter weight"
              name="weight"
              type="number"
              control={control}
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
