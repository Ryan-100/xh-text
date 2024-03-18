import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import MUIRadioGroup from "../../../components/form/InputRadio";
import { useForm } from "react-hook-form";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { getToken } from "../../../service/auth";

const AdvertisingAds = () => {
  const token = getToken();
  const [data, setData] = React.useState<any>(null);
  const [screens, setScreens] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { control, watch, register } = useForm({
    defaultValues: {
      type: "ads",
    },
  });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const type = watch("type");

  React.useEffect(() => {
    if (type !== "ads") {
      navigate("/setting/" + type);
    }
  }, [type]);

  const uploadImage = async (file) => {
    const res = await axios.post("http://64.23.137.248:2850/api/upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.status === 201) {
      setIsLoading(false);
      return res?.data?.data?.data[0];
    }
    console.log(res, "res");
  };

  const updateFile = async (event) => {
    setIsLoading(true);
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];

      if (file.size > 500 * 1024) {
        alert("File size exceeds the limit of 500 KB.");
        return;
      }

      // Get file name
      const fileSize = file.size / 1024;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const img = new Image();
          img.src = e.target.result.toString();
        }
      };
      const isImage = await uploadImage({ file: file });
      if (isImage) {
        const newScreen = {
          id: new Date().toString(),
          image_url: isImage, // Set initial image source if needed
          // file: { fileSize, width: img.width, height: img.height },
          link: "",
        };
        setScreens((prevScreens) => [...prevScreens, newScreen]);
      }
    }
  };

  const handleRemoveImage = () => {
    setScreens([]);
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
        <p className="text-2xl font-semibold">Photo Settings</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Settings</p>{" "}
          <p className=" py-2 px-2">Photo Settings</p>
        </div>
      </div>
      <div className="px-4">
        <MUIRadioGroup
          control={control}
          name="type"
          defaultValue={"ads"}
          options={[
            { label: "Onboarding", value: "onboarding" },
            { label: "Advertising ads", value: "advertising-ads" },
            { label: "Ads", value: "ads" },
          ]}
        />
      </div>
      <div className="w-full h-fit flex flex-col items-center justify-center space-y-6 p-6 bg-white rounded-[10px] drop-shadow">
        <p className="text-xl">Change Design for Ads Screen of User App</p>
        <label htmlFor="file-input" className="cursor-pointer">
          <input
            id="file-input"
            type="file"
            accept=".png,.jpg"
            onChange={updateFile}
            hidden
          />
          <div className="rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
            <Icon name="edit1" width={24} height={24} />
            <p className="text-[20px] text-white">Select Images</p>
          </div>
        </label>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray">Acceptable formats : jpg,png only</p>
          <p className="text-gray">Max file size : 500 KB</p>
          <p className="text-gray">Recommend : 1:1 (Ratio Size)</p>
        </div>
      </div>
      {data && (
        <div className="w-[344px] h-fit flex flex-col items-center justify-center space-y-6 p-16 bg-white rounded-[10px] drop-shadow relative group">
          <Tooltip
            title={`${data.fileSize.toFixed()} KB | ${data.width} x ${
              data.height
            } px`}
            arrow
            placement="top"
          >
            <img
              src={data.img}
              alt="screen"
              className="w-[232px] h-[502px] "
            />
          </Tooltip>
          <button
            className="absolute !z-10 -top-2 right-6 bg-primary text-white w-8 h-8 text-center rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemoveImage}
          >
            x
          </button>
          <input
            type="text"
            placeholder="Enter Ad Link"
            className="placeholder:font-bold placeholder:text-gray-light placeholder:text-base p-3  text-base outline-none border border-gray-light rounded-[10px] text-center w-full"
          />
          <div className="rounded-[10px] bg-primary py-3 px-[29px] flex items-center space-x-3 ">
            <Icon name="success" width={24} height={24} />
            <p className="text-[20px] text-white">Apply</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertisingAds;
