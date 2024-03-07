import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { amount } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const AmountDetail = () => {
  const [amountData, setAmountData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [notFilled, setNotFilled] = React.useState(false);

  const navigate = useNavigate();
  const { id: amountId } = useParams();
  const dispatch = useDispatch();
  const {control,handleSubmit,setValue} = useForm();

  React.useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await dispatch(amount.getAmountById(amountId) as any);
        setAmountData(res?.data);
        setValue('delivery_fee',res?.data?.delivery_fee)
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCounter();
  }, [dispatch, amountId]);

    const updateAmount = async (data) => {
    const res = await dispatch(amount.updateAmount(amountId,data) as any);
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
      goBack()
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const onSubmit= data =>{
    if(data.delivery_fee){
      updateAmount({delivery_fee:parseInt(data.delivery_fee)})
    }else{
      setNotFilled(true);
    }
  }

  return (
    <>
    
   {amountData && <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-[2px]">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <p className="text-2xl font-semibold">Amount Detail</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Amount</p>{" "}
          <p className=" py-2 px-2">Amount Detail</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
        <div className="flex space-x-6 justify-start w-full ">
          <div className="flex flex-col space-y-4 w-[780px]">
            <div className="h-12 w-full py-3 px-4 flex items-center">
              <p className="text-gray w-[252px] text-xl">From</p>
              <p className="text-secondary w-[252px] text-xl">{amountData?.from_city?.city_eng}</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center">
              <p className="text-gray w-[252px] text-xl">To</p>
              <p className="text-secondary w-[252px] text-xl">{amountData?.to_city?.city_eng}</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center">
              <p className="text-gray w-[252px] text-xl">Weight</p>
              <p className="text-secondary w-[252px] text-xl">{amountData?.weight?.weight} KG</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-start ">
              <p className="text-gray w-[252px] text-xl">Currency</p>
              <p className="text-secondary w-[252px] text-xl">{amountData?.currency?.name}</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center mb-6">
              <p className="text-gray w-[252px] text-xl">Amount</p>
              <div className="w-[528px]">
                <InputField
                  name="delivery_fee"
                  type="number"
                  defaultValue={amountData?.delivery_fee}
                  control={control}
                  label={""}
                  placeholder="Enter Amount"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <button className="self-start cursor-pointer rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
        <Icon name="save" width={16} height={16} />
        <p className="text-[20px] text-white">Save Updates</p>
      </button>
    </form>}
    <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"Amount Delivery Fee has been sent successfully."}
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

export default AmountDetail;
