import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/form/Button";
import InputSelect from "../../../components/form/InputSelect";
import { useNavigate } from "react-router-dom";
import MUIinput from "../../../components/form/MUIinput";


export const switchOptions = [
  { value: true, label: "on" },
  { value: false, label: "off" },
];

const Create = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      // Specify your default values here
      os: "",
      app: "",
      link: "",
      version: "",
      update: "",
    },
  });
  const goBack = () => {
    navigate("/setting/versions");
  };
  return (
    <form className="w-full flex flex-col items-center justify-center">
      <div className="w-[260px] md:w-[460px] flex flex-col items-center space-y-4">
        <p className="font-bold text-lg my-3 self-start">Creat new version</p>

        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">OS Type</p>
          <div className="w-2/3">
            <MUIinput
              label="Enter your operatin system"
              name="os"
              control={control}
              fullWidth
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">App name</p>
          <div className="w-2/3">
            <MUIinput
              label="Enter your app name"
              name="app"
              control={control}
              fullWidth
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Link</p>
          <div className="w-2/3">
            <MUIinput
              label="Enter your link"
              name="link"
              control={control}
              fullWidth
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Current Version</p>
          <div className="w-2/3">
            <MUIinput
              label="Enter current version"
              name="version"
              control={control}
              fullWidth
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Force Update</p>
          <div className="w-2/3">
            <InputSelect
              label="Select on/off"
              name="update"
              control={control}
              options={switchOptions}
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
