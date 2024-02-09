import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../components/form/InputSelect";
import Button from "../../components/form/Button";
import MUIinput from "../../components/form/MUIinput";
import MuiTextarea from "../../components/form/TextArea";

const counterOptions = [
  { value: "headquater", label: "headquater" },
  { value: "jiegao", label: "jiegao" },
  { value: "lasio", label: "lasio" },
  { value: "muse", label: "muse" },
  { value: "mandalay", label: "mandalay" },
];

const Create = () => {
  const navigate = useNavigate();  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      // Specify your default values here
      counter: "",
      block: "",
      city: "",
      region: "",
      name: "",
      phone: "",
      address: "",
    },
  });

  const goBack = () => {
    navigate(-1);
  };

  const updateProfileImage = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setProfileImage(e.target.result.toString());
        }
      };
      // setOpenSuccessModal(true);
    }
  };

  return (
    <form className="w-full flex flex-col items-center justify-center">
      <div className="w-[260px] md:w-[460px] flex flex-col items-center space-y-4">
        <p className="font-bold text-lg my-3 self-start">
          Creat a new Customer
        </p>
        <div className="flex items-center justify-center w-full">
          <div className="w-1/3">
           <img className="w-16 h-16 md:w-24 md:h-24 object-contain border" src={profileImage?profileImage:"/person.png"} />
          </div>
          <div className="w-2/3">

          <label htmlFor="file-input" className=" border border-1 p-1 rounded-md cursor-pointer">
            <input
              id="file-input"
              type="file"
              accept=".png"
              onChange={updateProfileImage}
              hidden
            />
            Choose photo
          </label>
        </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            Region <span className="text-red">*</span>
          </p>
          <div className="w-2/3">
            <InputSelect
              label="Select Region"
              name="region"
              control={control}
              options={counterOptions}
              fullWidth
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            City <span className="text-red">*</span>
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
            Block <span className="text-red">*</span>
          </p>
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
          <p className="w-1/3">
            Name <span className="text-red">*</span>
          </p>
          <div className="w-2/3">
            <MUIinput
              label="Enter user name"
              name="name"
              control={control}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            Phone <span className="text-red">*</span>
          </p>
          <div className="w-2/3">
            <MUIinput label="Phone" name="phone" control={control} fullWidth />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">
            Address <span className="text-red">*</span>
          </p>
          <div className="w-2/3">
            <MUIinput
              label="Address"
              name="address"
              control={control}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Counter</p>
          <div className="w-2/3">
            <InputSelect
              label="Select Counter"
              name="counter"
              control={control}
              options={counterOptions}
              fullWidth
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="w-1/3">Map link</p>
          <div className="w-2/3">
            <MuiTextarea
            rows={2}
              label="Enter your map link"
              name="map"
              control={control}
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
