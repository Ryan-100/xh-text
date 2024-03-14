import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import axios from "axios";
import { getLocalStorageData, getToken } from "../../../service/auth";
import AlertModal from "../../../components/Modal/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  PaymentTypeInterface,
  payment,
} from "../../../store/actions";

const PaymentMethodCreate = () => {
  const token = getToken();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const [source, setSource] = React.useState<string | undefined>(undefined);
  const [_, setFile] = React.useState<File | null>(null);
  const [icon_url, setIcon_url] = React.useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all_cities } = useSelector((state: any) => state.city);
  const user_id = getLocalStorageData("user_id");

  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });

  const cityOptions = all_cities
    ? all_cities?.data?.map((city) => ({
        value: city.id,
        label: city.city_eng,
      }))
    : [];

  const createPaymentType = async (data: PaymentTypeInterface) => {
    const res = await dispatch(payment.createPaymentType(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setIsLoading(false);
      setNotFilled(false);
      setValue("name", "");
      setIcon_url("");
      setSource("");
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
      setIcon_url(res?.data?.data?.data[0]);
      setIsLoading(false);
    }
    console.log(res, "res");
  };
  const updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileData = event.target.files[0];
      setFile(fileData);

      if (fileData.size > 100 * 1024) {
        alert("File size exceeds the limit of 100 KB.");
        return;
      }

      // Get file name
      const fileName = fileData.name;

      const reader = new FileReader();
      reader.readAsDataURL(fileData);

      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setSource(fileName);
        }
      };
      setIsLoading(true);
      uploadImage({ file: fileData });
    }
  };
  const onSubmit = (data) => {
    if (data.name && data.city_id && icon_url) {
      createPaymentType({ ...data, icon_url, created_by: user_id,receive_qr_url:'www.haha.com' });
    } else {
      setNotFilled(true);
    }
  };

  const goBack = () => {
    navigate(-1);
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
                name="city_id"
                control={control}
                label={"Choose city"}
                options={cityOptions}
              />
            </div>
          </div>

          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Payment Method Name
            </p>
            <div className="w-[528px]">
              <InputField
                name="name"
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
        <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
          <Icon name="add" width={24} height={24} />
          <p className="text-[20px] text-white">Create</p>
        </button>
      </form>
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New payment type has been created successfully."}
      />
      <AlertModal
        open={isLoading}
        onClose={() => {}}
        title={"Loading"}
        body={"Please wait while image is uplading..."}
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

export default PaymentMethodCreate;
