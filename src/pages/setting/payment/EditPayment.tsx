import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { counterOptions } from "../../../layout/config";
import InputField from "../../../components/form/InputFiled";
import axios from "axios";
import { getToken } from "../../../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { PaymentTypeInterface, payment } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const PaymentMethodEdit = () => {
  const token = getToken();
  const [paymentData, setPaymentData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const [source, setSource] = React.useState<any>();
  const [_, setFile] = React.useState<File | null>(null);
  const [icon_url, setIcon_url] = React.useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: paymentId } = useParams();

  const { all_cities } = useSelector((state: any) => state.city);

  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });

  React.useEffect(() => {
    const fetchPaymentType = async () => {
      try {
        const res = await dispatch(
          payment.getPaymentTypeById(paymentId) as any
        );
        setPaymentData(res?.data);
        setIcon_url(res?.data?.icon_url)
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    fetchPaymentType();
  }, [dispatch, paymentId]);

  const cityOptions = all_cities
    ? all_cities?.data?.map((city) => ({
        value: city.id,
        label: city.city_eng,
      }))
    : [];

  const updatePaymentType = async (data) => {
    const res = await dispatch(
      payment.updatePaymentType(paymentId, data) as any
    );
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setIsLoading(false);
      setNotFilled(false);
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
      console.log(res?.data?.data?.data[0]);
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
      // const fileName = fileData.name;

      const reader = new FileReader();
      reader.readAsDataURL(fileData);

      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setSource(e.target.result.toString());
        }
      };
      setIsLoading(true);
      uploadImage({ file: fileData });
    }
  };

  const onSubmit = ({
    name = paymentData?.name,
    city_id = paymentData?.city_id,
  }) => {
    if (name && city_id && icon_url) {
      updatePaymentType({ name, city_id, icon_url });
    } else {
      setNotFilled(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {paymentData && (
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
              <p className="title">Edit Payment Method</p>
            </div>
            <div className="side-title  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Payment Method
              </p>
              <p className="py-2 px-2">Edit Payment Method</p>
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
                  defaultValue={paymentData?.city_id}
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
                  defaultValue={paymentData?.name}
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
                    <div className="rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
                      <Icon name="edit1" width={24} height={24} />
                      <p className="btn-lg">Select File</p>
                    </div>
                  </label>
                  <img
                    src={source ? source : paymentData?.icon_url}
                    alt="icon_image"
                  />
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
          <button className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
            <Icon name="save" width={24} height={24} />
            <p className="btn-lg">Save Updates</p>
          </button>
        </form>
      )}
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"This payment type has been edited successfully."}
      />
      <AlertModal
        open={isLoading}
        onClose={() => {}}
        title={"Loading"}
        body={"Please wait while image is uploading..."}
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

export default PaymentMethodEdit;
