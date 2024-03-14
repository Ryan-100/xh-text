import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { currency } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const CurrencyEdit = () => {
  const [currencyData, setCurrencyData] = React.useState<any>()
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const [error, setError] = React.useState("")
  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: currencyId } = useParams();

  React.useEffect(() => {
    const fetchCurrencyDetail = async () => {
      try {
        const res = await dispatch(currency.getCurrencyById(currencyId) as any);
        setCurrencyData(res?.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchCurrencyDetail();
  }, [dispatch, currencyId]);

  const updateCurrency = async (data) => {
    const res = await dispatch(currency.updateCurrency(currencyId,data) as any);
    console.log(res)
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
    }else if(res?.error){
      setError(res?.error)
    }
  };

  const onSubmit = ({ name }) => {
    if (name) {
      updateCurrency({
        name,
        active: 1,
      });
    } else {
      setNotFilled(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
    {currencyData &&  <form
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
            <p className="text-2xl font-semibold">Edit Currency</p>
          </div>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Currency
            </p>
            <p className="py-2 px-2">Edit Currency</p>
          </div>
        </div>
        <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Currency
            </p>
            <div className="w-[528px]">
              <InputField
                name="name"
                control={control}
                placeholder="E.g Ks, ¥ "
                defaultValue={currencyData?.name}
                label={""}
              />
            </div>
          </div>
        </div>
        <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
          <Icon name="save" width={24} height={24} />
          <p className="text-[20px] text-white">Save</p>
        </button>
      </form>}
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New Currency has been created successfully."}
      />
      <AlertModal
        open={notFilled}
        onClose={() => setNotFilled(false)}
        title={"Alert"}
        body={"Kindly fill all fields with the necessary information."}
      />
      <AlertModal
        open={error?true:false}
        onClose={() => setError("")}
        title={"Error"}
        body={error}
      />
    </>
  );
};

export default CurrencyEdit;
