import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import MUIRadioGroup from "../../../components/form/InputRadio";
import { useForm } from "react-hook-form";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getToken } from "../../../service/auth";
import { banner } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

const Banner = () => {
  const token = getToken();
  const [data, setData] = React.useState(null);
  const [screens, setScreens] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();
  const [uploadId, setUploadId] = React.useState();
  const [isUpdate, setIsUpdate] = React.useState(false);

  const defaultValues = React.useMemo(() => {
    const values = { type: "advertising-ads" };
    screens?.forEach((_, index) => {
      values[`link${index}`] = "";
    });
    return values;
  }, [screens]);

  const { control, watch, handleSubmit, register } = useForm({
    defaultValues,
  });

  console.log(defaultValues, "df");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = watch("type");

  const fetchBanner = async () => {
    try {
      const res = await dispatch(banner.getAllBanners());
      setData(res?.data);
      setScreens(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  React.useEffect(() => {
    if (type !== "advertising-ads") {
      navigate("/setting/" + type);
    }
  }, [type]);

  React.useEffect(() => {
    fetchBanner();
  }, []);

  console.log(data, "banner data");

  const createBanner = async (data) => {
    const res = await dispatch(banner.createBanner(data));
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
      fetchBanner();
    }
  };

  const updateBannner = async (data) => {
    const res = await dispatch(banner.updateBanner(uploadId, data));
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
      fetchBanner();
    }
  };

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
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.size > 500 * 1024) {
        alert("File size exceeds the limit of 500 KB.");
        return;
      }

      // Get file name
      const fileSize = file.size / 1024;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (e) => {
        if (e.target && e.target.result) {
          const img = new Image();
          img.src = e.target.result.toString();
          setIsLoading(true);
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
  const removeScreen = async (id) => {
    const hasId = data.some((item) => item.id === id);
    if (hasId) {
      const res = await dispatch(banner.deleteBanner(id));
      if (res?.statusCode === 200) {
        const updatedScreens = screens.filter((screen) => screen.id !== id);
        setScreens(updatedScreens);
        setIsDelete(false);
        setIsSuccess(true);
        fetchBanner();
      }
    } else {
      const updatedScreens = screens.filter((screen) => screen.id !== id);
      setScreens(updatedScreens);
    }
  };

  const onSubmit = (i) => (data) => {
    if (data[`link${i}`]) {
      if (isUpdate) {
        updateBannner({
          link: data[`link${i}`],
          active: 0,
          image_url: screens.filter((screen) => screen.id === uploadId)[0]
            .image_url,
        });
        setIsUpdate(false);
      } else {
        createBanner({
          link: data[`link${i}`],
          active: 0,
          image_url: screens.filter((screen) => screen.id === uploadId)[0]
            .image_url,
        });
      }
    } else {
      setNotFilled(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
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
          <p className="title">Photo Settings</p>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>{" "}
            <p className=" py-2 px-2">Photo Settings</p>
          </div>
        </div>
        <form className="px-4">
          <MUIRadioGroup
            control={control}
            name="type"
            defaultValue={"advertising-ads"}
            options={[
              { label: "Onboarding", value: "onboarding" },
              { label: "Advertising ads", value: "advertising-ads" },
              { label: "Ads", value: "ads" },
            ]}
          />
        </form>
        <div className="w-full h-fit flex flex-col items-center justify-center space-y-6 p-6 bg-white rounded-[10px] drop-shadow">
          <p className="text-xl">
            Change Design for Advertising Ads Screen of User App
          </p>
          <label htmlFor="file-input" className="cursor-pointer">
            <input
              id="file-input"
              type="file"
              accept=".png,.jpg"
              onChange={updateFile}
              hidden
            />
            <div className="rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
              <Icon name="edit1" width={24} height={24} />
              <p className="btn-lg">Select Images</p>
            </div>
          </label>
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray">Acceptable formats : jpg,png only</p>
            <p className="text-gray">Max file size : 500 KB</p>
            <p className="text-gray">Recommend : 1:1 (Ratio Size)</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {screens &&
            screens.map((data, i) => (
              <form
                key={i}
                onSubmit={(e) => handleSubmit(onSubmit(i))(e)}
                className="w-[350px] h-[300px] flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-[10px] drop-shadow relative group"
              >
                <Tooltip
                  title={`${data?.file?.fileSize.toFixed()} KB | ${
                    data?.file?.width
                  } x ${data?.file?.height} px`}
                  arrow
                  placement="top"
                >
                  <img
                    src={data?.image_url}
                    alt="screen"
                    className="w-[400px] h-[120px] object-fill "
                  />
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
                <input
                  type="text"
                  name={`link${i}`}
                  placeholder="Enter Ad Link"
                  defaultValue={data.link}
                  className="placeholder:font-bold placeholder:text-gray-light placeholder:text-base p-3  text-base outline-none border border-gray-light rounded-[10px] text-center w-full"
                  {...register(`link${i}`)}
                />
                {data.link ? (
                  <button
                    onClick={() => {
                      setUploadId(data.id);
                      setIsUpdate(true);
                    }}
                    className="rounded-[10px] bg-primary py-3 px-[29px] flex items-center space-x-3 "
                  >
                    <Icon name="success" width={24} height={24} />
                    <p className="btn-lg">Apply</p>
                  </button>
                ) : (
                  <button
                    onClick={() => setUploadId(data.id)}
                    className="rounded-[10px] bg-primary py-3 px-[29px] flex items-center space-x-3 "
                  >
                    <Icon name="success" width={24} height={24} />
                    <p className="btn-lg">Apply</p>
                  </button>
                )}
              </form>
            ))}
          {screens && screens.length > 0 && (
            <div className="w-[350px] h-fit flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-[10px] drop-shadow relative group">
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
                    <Icon name="add" width={40} height={40} color="#FF6604" />
                  </div>
                </label>

                <p className="text-black">Add New</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalComponent
        title="Confirm"
        body={
          "Are you sure to delete this define on ads banner? Please confirm it."
        }
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onConfirm={() => removeScreen(deleteId)}
      />
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New ads banner has been created successfully."}
      />
      <AlertModal
        open={notFilled}
        onClose={() => setNotFilled(false)}
        title={"Alert"}
        body={"Kindly fill all fields with the necessary information."}
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

export default Banner;
