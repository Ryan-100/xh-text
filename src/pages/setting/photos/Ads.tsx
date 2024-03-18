import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import MUIRadioGroup from "../../../components/form/InputRadio";
import { useForm } from "react-hook-form";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { getToken } from "../../../service/auth";
import { AppJustBannerInteface, banner } from "../../../store/actions";
import { useDispatch } from "react-redux";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

const AdvertisingAds = () => {
  const token = getToken();
  const [data, setData] = React.useState<any>(null);
  const [screen, setScreen] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const { control, watch } = useForm({
    defaultValues: {
      type: "ads",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate(-1);
  };

  const type = watch("type");

  const fetchAppJustBanner = async () => {
    try {
      const res = await dispatch(banner.getAllAppJustBanners() as any);
      console.log(res, "res is updating");
      setData(res?.data[0]);
      return res?.data[0];
    } catch (error) {
      console.error("Error fetching ", error);
    }
  };

  React.useEffect(() => {
    fetchAppJustBanner();
  }, []);

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
  };

  const createAppJustBanner = async (data: AppJustBannerInteface) => {
    const res = await dispatch(banner.createAppJustBanner(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      const res = await fetchAppJustBanner();
      setData(res);
      setScreen(null);
    }
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
        };
        setScreen(newScreen);
      }
    }
  };

  const handleRemoveImage =async (id) => {
    const hasId = data.id === id;
    if (hasId) {
      const res = await dispatch(banner.deleteAppJustBanner(id) as any);
      if (res?.statusCode === 200) {
    setScreen(null);
       setIsDelete(false);
        setIsSuccess(true);
        fetchAppJustBanner();
      }
    } else {
      setScreen(null);
      setIsDelete(false);
    }
  };

  const onSubmit = () =>{
    createAppJustBanner({
      image_url:screen.image_url,
      active:0
    });
  }
  return (
    <>
   
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
      {!data && !screen && (
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
      )}
      {data && (
        <div className="w-[344px] h-fit flex flex-col items-center justify-center space-y-6 p-16 bg-white rounded-[10px] drop-shadow relative group">
          <Tooltip
            title={`${data?.fileSize?.toFixed()} KB | ${data?.width} x ${
              data?.height
            } px`}
            arrow
            placement="top"
          >
            <img src={data?.image_url} alt="screen" className="w-[232px] h-[502px] " />
          </Tooltip>
          <button
            className="absolute !z-10 -top-2 right-6 bg-primary text-white w-8 h-8 text-center rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => {
              setIsDelete(true);
              setDeleteId(data.id);
            }}
          >
            x
          </button>
          <button disabled className="rounded-[10px] cursor-not-allowed bg-primary py-3 px-[29px] flex items-center space-x-3 ">
            <Icon name="success" width={24} height={24} />
            <p className="text-[20px] text-white">Apply</p>
          </button>
        </div>
      )}
      {screen && (
        <div className="w-[344px] h-fit flex flex-col items-center justify-center space-y-6 p-16 bg-white rounded-[10px] drop-shadow relative group">
          <Tooltip
            title={`${screen?.fileSize?.toFixed()} KB | ${screen?.width} x ${
              screen?.height
            } px`}
            arrow
            placement="top"
          >
            <img src={screen?.image_url} alt="screen" className="w-[232px] h-[502px] " />
          </Tooltip>
          <button
            className="absolute !z-10 -top-2 right-6 bg-primary text-white w-8 h-8 text-center rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => {
              setIsDelete(true);
              setDeleteId(data.id);
            }}
          >
            x
          </button>
          <button onClick={()=>onSubmit()} className="rounded-[10px] bg-primary py-3 px-[29px] flex items-center space-x-3 ">
            <Icon name="success" width={24} height={24} />
            <p className="text-[20px] text-white">Apply</p>
          </button>
        </div>
      )}
    </div>
    <ModalComponent
        title="Confirm"
        body={
          "Are you sure to delete this define ads? Please confirm it."
        }
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onConfirm={() => handleRemoveImage(deleteId)}
      />
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New ads has been created successfully."}
      />
            <AlertModal
        open={isLoading}
        onClose={() => {}}
        title={"Loading"}
        body={"Please wait while image is uplading..."}
      />
     </>
  );
};

export default AdvertisingAds;
