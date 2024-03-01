import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";

const TermsAndPolicy = () => {
  const [source, setSource] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
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
      <div className="flex justify-between items-center mb-[2px]">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <p className="text-2xl font-semibold">Terms & Policy</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Settings</p>{" "}
          <p className=" py-2 px-2">Terms & Policy</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
        <div className="flex items-center justify-center space-x-8">
          <p className="text-gray leading-6">Current Terms & Policy</p>
          <p className="text-primary leading-6">{source && source}</p>
        </div>
        {source && (
          <div className="rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
            <Icon name="success" width={24} height={24} />
            <p className="text-[20px] text-white">Update</p>
          </div>
        )}
      </div>
      <div className="w-full h-[216px] flex flex-col items-center justify-center space-y-6 p-6 bg-white rounded-[10px] drop-shadow">
        <p className="text-xl">Change Terms & Policy for User App</p>

        <label htmlFor="file-input" className="cursor-pointer">
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={updateFile}
            hidden
          />
          <div className="rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
            <Icon name="edit1" width={24} height={24} />
            <p className="text-[20px] text-white">Select File</p>
          </div>
        </label>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray">Acceptable formats : pdf only</p>
          <p className="text-gray">Max file size : 100 KB</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPolicy;
