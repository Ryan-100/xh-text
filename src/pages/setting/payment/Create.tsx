import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { counterOptions, roleOptions } from "../../../layout/config";
import InputField from "../../../components/form/InputFiled";

const PaymentMethodCreate = () => {
  const [source, setSource] = React.useState<string | undefined>(undefined);
  const [file, setFile] = React.useState<File | null>(null);
  const { control } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const updateFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      setFile(file);

      if (file.size > 100 * 1024) {
        alert("File size exceeds the limit of 100 KB.");
        return;
      }

      setFile(file);

      // Get file name
      const fileName = file.name;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setSource(fileName);
        }
      };
    }
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
          <p className="text-2xl font-semibold">Create Payment Method</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">
            Payment Method
          </p>
          <p className="py-2 px-2">Create Payment Method</p>
        </div>
      </div>
      <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">City</p>
          <div className="w-[528px]">
            <InputSelect
              fullWidth
              name="city"
              control={control}
              label={""}
              options={counterOptions}
            />
          </div>
        </div>

        <div className="flex items-start justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">
            Payment Method Name
          </p>
          <div className="w-[528px]">
            <InputField
              name="payment"
              control={control}
              placeholder="E.g KBZ Pay"
              label={""}
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">
            Payment Method Photo
          </p>
          <div className="w-[528px]">
            <div className="flex items-center space-x-6">
              <label htmlFor="file-input" className="cursor-pointer">
                <input
                  id="file-input"
                  type="file"
                  accept=".jpg,.png"
                  onChange={updateFile}
                  hidden
                />
                <div className="rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
                  <Icon name="edit1" width={24} height={24} />
                  <p className="text-[20px] text-white">Select File</p>
                </div>
              </label>
              <p className="text-gray">{source && source}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-[780px]">
          <div className="pl-[256px] text-center">
            <p className="text-gray">Acceptable formats : jpg, png only</p>
            <p className="text-gray">Max file size : 500 KB</p>
            <p className="text-gray">Recommend : 1:1 (Ratio Size)</p>
          </div>
        </div>
      </div>
      <div className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
        <Icon name="add" width={24} height={24} />
        <p className="text-[20px] text-white">Create</p>
      </div>
    </div>
  );
};

export default PaymentMethodCreate;
