import React from "react";
import { useForm } from "react-hook-form";
import Icon from "../../../icons";
import { Tooltip } from "@mui/material";

const OnboardingDetail = ({ source, file, setSource }) => {
  const [screens, setScreens] = React.useState([
    { id: "1", img: source, file: file, title: "", description: "" },
  ]);
  const { register } = useForm({ mode: "onChange" });
  const goBack = () => {
    setSource("");
  };

  const updateFile = (event) => {
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
          const newScreen = {
            id: e.target.result.toString(),
            img: e.target.result.toString(), // Set initial image source if needed
            file: { fileSize, width: img.width, height: img.height },
            title: "",
            description: "",
          };
          setScreens((prevScreens) => [...prevScreens, newScreen]);
        }
      };
    }
  };
  const removeScreen = (id) => {
    // Filter out the screen with the specified id
    const updatedScreens = screens.filter((screen) => screen.id !== id);
    setScreens(updatedScreens);
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
          <p className="text-2xl font-semibold">Onboarding Photo Settings</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Settings</p>
          <p className="py-2 px-2">Photo Settings</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-[10px] flex items-center justify-between">
        <div className="flex space-x-4 items-center justify-center">
          <label htmlFor="file-input" className="cursor-pointer">
            <input
              id="file-input"
              type="file"
              accept=".png,.jpg"
              onChange={updateFile}
              hidden
            />
            <div className="bg-bright-ascent-1 rounded-md w-12 h-12  flex items-center justify-center">
              <Icon name="add" width={24} height={24} color="#FF6604" />
            </div>
          </label>

          <p className="text-black">Add New</p>
        </div>
        <div className="rounded-[10px] bg-primary py-3 px-[78.5px] flex items-center space-x-3 ">
          <Icon name="success" width={24} height={24} />
          <p className="text-[20px] text-white">Submit</p>
        </div>
      </div>
      <div className="">
        <p className="text-gray">
          Image Acceptable formats : jpg, png only | Max file size : 500 KB |
          Recommend : 1:1 (Ratio Size)
        </p>
        <p className="text-green">
          Although there is no restriction about the number of screens, 3
          screens are recommended.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {screens.map((data, i) => (
          <div className="flex flex-col space-y-4 w-[344px] relative">
            <p className="bg-gray-light-1  text-xl text-black rounded-[10px] py-2 text-center">
              Screen {i + 1}
            </p>
            <div className="bg-white relative border z-0 border-gray-light rounded-[10px] p-14 space-y-6 group">
              <Tooltip
                title={`${data.file.fileSize.toFixed()} KB | ${
                  data.file.width
                } x ${data.file.height} px`}
                arrow
                placement="top"
              >
                <img
                  src={data.img}
                  alt="screen"
                  className="w-[232px] h-[232px] "
                />
              </Tooltip>
              <button
                className="absolute !z-10 -top-2 right-6 bg-primary text-white w-8 h-8 text-center rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeScreen(data.id)}
              >
                x
              </button>
              <div className="w-[232px] space-y-6">
                <input
                  type="text"
                  placeholder="Enter headline"
                  className="placeholder:font-bold placeholder:text-gray-light placeholder:text-base p-3  text-base outline-none border border-gray-light rounded-[10px] text-center w-full"
                  {...register("title")}
                />
                <textarea
                  rows={3.5}
                  placeholder="Describe Detail"
                  className=" placeholder:text-gray-light placeholder:text-base p-3  text-base outline-none border border-gray-light rounded-[10px] text-center w-full resize-none"
                  {...register("title")}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingDetail;
