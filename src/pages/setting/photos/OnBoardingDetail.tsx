import React from "react";
import { useForm } from "react-hook-form";
import Icon from "../../../icons";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppBannerInteface, banner } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";
import ModalComponent from "../../../components/Modal";

const OnboardingDetail = ({
  source,
  updateData,
  uploadImage,
  data,
  setSource,
}) => {
  const [screens, setScreens] = React.useState(data);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const screensRef = React.useRef([]);
  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const goBack = () => {
    setSource("");
  };

  React.useEffect(() => {
    if (source && !screensRef.current.includes(source)) {
      setScreens((p) => [
        ...p,
        { id: 1, image_url: source, title: "", description: "" },
      ]);
      screensRef.current.push(source);
    }
  }, [source]);

  const fetchAppBanner = async () => {
    try {
      const res = await dispatch(banner.getAllAppBanners() as any);
      console.log(res, 'res is updating')
      setScreens(res?.data);
      updateData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };
  const createAppBanner = async (data: AppBannerInteface) => {
    const res = await dispatch(banner.createAppBanner(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
      setValue("title", "");
      setValue("description", "");
      fetchAppBanner();
    }
  };

  const updateFile = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];

      if (file.size > 500 * 1024) {
        alert("File size exceeds the limit of 500 KB.");
        return;
      }

      // const fileSize = file.size / 1024;

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
          title: "",
          description: "",
        };
        setScreens((prevScreens) => [...prevScreens, newScreen]);
      }
    }
  };

  const removeScreen = async (id) => {
    const hasId = data.some((item) => item.id === id);
    if (hasId) {
      const res = await dispatch(banner.deleteAppBanner(id) as any);
      if (res?.statusCode === 200) {
        const updatedScreens = screens.filter((screen) => screen.id !== id);
        setScreens(updatedScreens);
        setValue("title", "");
        setValue("description", "");
        setIsDelete(false);
        setIsSuccess(true);
        fetchAppBanner();
      }
    } else {
      const updatedScreens = screens.filter((screen) => screen.id !== id);
      setScreens(updatedScreens);
      setValue("title", "");
      setValue("description", "");
      setIsDelete(false);
    }
  };

  const onSubmit = ({ title, description }) => {
    if (title && description) {
      createAppBanner({
        title,
        description,
        active: 0,
        image_url: screens[screens.length - 1].image_url,
      });
    } else {
      setNotFilled(true);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="flex justify-between items-center">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <div className="text-center">
            <p className="title">Onboarding Photo Settings</p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Photo Settings</p>
          </div>
        </div>
        <div
          className={`bg-white p-6 rounded-[10px] flex items-center ${
            screens?.length <= data?.length ? "justify-between" : "justify-end"
          }`}
        >
          {screens?.length <= data?.length && (
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
          )}
          <button className="self-end rounded-[10px] bg-primary py-3 px-[78.5px] flex items-center space-x-3 ">
            <Icon name="success" width={24} height={24} />
            <p className="btn-lg">Submit</p>
          </button>
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
                  title={`${data?.file?.fileSize.toFixed()} KB | ${
                    data?.file?.width
                  } x ${data?.file?.height} px`}
                  arrow
                  placement="top"
                >
                  <img
                    src={data?.image_url}
                    alt="screen"
                    className="w-[232px] h-[232px] "
                  />
                </Tooltip>
                <button
                  type="button"
                  className="absolute !z-10 -top-2 right-6 bg-primary text-white w-8 h-8 text-center rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setIsDelete(true);
                    setDeleteId(data.id);
                  }}
                >
                  x
                </button>
                {data.title && data.description ? (
                  <div className="w-[232px] space-y-6">
                    <input
                      type="text"
                      placeholder="Enter headline"
                      defaultValue={data?.title}
                      disabled
                      className="placeholder:font-bold placeholder:text-gray-light placeholder:text-base p-3  text-base outline-none border border-gray-light rounded-[10px] text-center w-full"
                    />
                    <textarea
                      rows={3.5}
                      disabled
                      defaultValue={data?.description}
                      placeholder="Describe Detail"
                      className=" placeholder:text-gray-light placeholder:text-base p-3  text-base outline-none border border-gray-light rounded-[10px] text-center w-full resize-none"
                    />
                  </div>
                ) : (
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
                      {...register("description")}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
      <ModalComponent
        title="Confirm"
        body={
          "Are you sure to delete this define on boarding banner? Please confirm it."
        }
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onConfirm={() => removeScreen(deleteId)}
      />
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New onboarding banner has been created successfully."}
      />
      <AlertModal
        open={notFilled}
        onClose={() => setNotFilled(false)}
        title={"Alert"}
        body={"Kindly fill all fields with the necessary information."}
      />
    </>
  );
};

export default OnboardingDetail;
