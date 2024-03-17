import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import MUIRadioGroup from "../../../components/form/InputRadio";
import { useForm } from "react-hook-form";
import OnboardingDetail from "./OnBoardingDetail";
import { getToken } from "../../../service/auth";
import axios from "axios";
import AlertModal from "../../../components/Modal/AlertModal";
import { useDispatch } from "react-redux";
import { banner } from "../../../store/actions";

const PhotoSettings = () => {
  const token = getToken();
  const [data, setData] = React.useState<any>(null);
  const [source, setSource] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fileData, setFileData] = React.useState<any>(null);
  const { control, watch } = useForm({
    defaultValues: {
      type: "onboarding",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = watch("type");

  const uploadImage = async (file) => {
    const res = await axios.post("http://64.23.137.248:2850/api/upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.status === 201) {
      setSource(res?.data?.data?.data[0]);
      setIsLoading(false);
      return res?.data?.data?.data[0];
    }
    console.log(res, "res");
  };

  const fetchAppBanner = async () => {
    try {
      const res = await dispatch(banner.getAllAppBanners() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  React.useEffect(() => {
    fetchAppBanner();
  }, []);

  console.log(data, "data");

  React.useEffect(() => {
    if (type !== "onboarding") {
      navigate("/setting/" + type);
    }
  }, [type]);

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

          setFileData({
            width: img.width,
            height: img.height,
            fileSize,
          });
        }
      };
      setIsLoading(true);
      uploadImage({ file: file });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {source  ? (
        <OnboardingDetail
          source={source}
          data={data}
          updateData={setData}
          uploadImage={uploadImage}
          setSource={setSource}
        />
      ) : (
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
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Settings
              </p>{" "}
              <p className=" py-2 px-2">Photo Settings</p>
            </div>
          </div>
          <div className="px-4">
            <MUIRadioGroup
              control={control}
              name="type"
              defaultValue={"onboarding"}
              options={[
                { label: "Onboarding", value: "onboarding" },
                { label: "Advertising ads", value: "advertising-ads" },
                { label: "Ads", value: "ads" },
              ]}
            />
          </div>
          <div className="w-full h-fit flex flex-col items-center justify-center space-y-6 p-6 bg-white rounded-[10px] drop-shadow">
            <p className="text-xl">
              Change Designs for Onboarding Screen of User App
            </p>
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
        </div>
      )}
      <AlertModal
        open={isLoading}
        onClose={() => {}}
        title={"Loading"}
        body={"Please wait while image is uplading..."}
      />
    </>
  );
};

export default PhotoSettings;
