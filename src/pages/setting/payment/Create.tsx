import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/form/Button";
import InputSelect from "../../../components/form/InputSelect";
import { useNavigate } from "react-router-dom";
import MUIinput from "../../../components/form/MUIinput";
import { counterOptions } from "../../../layout/config";




export const switchOptions = [
  { value: true, label: "on" },
  { value: false, label: "off" },
];

const Create = () => {  
  const [iconImage, setIconImage] = useState<string | undefined>(
  undefined
);
const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      // Specify your default values here
      method: "",
      switch: "",
      city:"",
    },
  });
  const goBack = () => {
    navigate(-1);
  };

  const uploadIconImage = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setIconImage(e.target.result.toString());
        }
      };
      // setOpenSuccessModal(true);
    }
  };
  return (
    <form className="w-full flex flex-col items-center justify-center">
      <div className="w-[260px] md:w-[460px] flex flex-col items-center space-y-4">
        <p className="font-bold text-lg my-3 self-start">Creat payment type</p>
        {/* <div className="self-start">
          <MUIRadioGroup
            name="device"
            control={control}
            options={deviceOptions}
          />
        </div> */}
        <div className="flex items-center justify-center w-full">
          <div className="w-1/3">
           <img className="w-16 h-16 md:w-24 md:h-24 object-contain border" src={iconImage?iconImage:"/icon.png"} />
          </div>
          <div className="w-2/3">

          <label htmlFor="file-input" className=" border border-1 p-1 rounded-md cursor-pointer">
            <input
              id="file-input"
              type="file"
              accept=".png"
              onChange={uploadIconImage}
              hidden
            />
            Choose icon
          </label>
        </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Method name</p>
          <div className="w-2/3">
            <MUIinput
              label="Enter method name"
              name="method"
              control={control}
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

          <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            On/Off
          </p>
          <div className="w-2/3">
            <InputSelect
              label="Select open or close"
              name="switch"
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
