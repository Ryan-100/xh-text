import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useDispatch } from "react-redux";
import { payment } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import { formatDate } from "../../../utils";

const PaymentMethodDetail = () => {
  const [paymentData, setPaymentData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const { id: paymentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCityDetail = async () => {
      try {
        const res = await dispatch(
          payment.getPaymentTypeById(paymentId) as any
        );
        setPaymentData(res?.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchCityDetail();
  }, [dispatch, paymentId]);

  const deleteHandler = async () => {
    const res = await dispatch(payment.deletePaymentType(paymentId) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      goBack();
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("edit");
  };

  return (
    <>
      {paymentData && (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="title">Payment Method Detail</p>
            <div className="side-title  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Payment Method
              </p>{" "}
              <p className=" py-2 px-2">Payment Method Detail</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
            <div className="flex items-center justify-center space-x-[84px]">
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created Date</p>
                <p className="text-secondary leading-6">
                  {formatDate(paymentData?.created_at)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created By</p>
                <p className="text-secondary leading-6">
                  {paymentData?.created_user?.username || "Unknown"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={goToEdit}
                className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 "
              >
                <Icon name="edit1" width={24} height={24} />
                <p className="btn-lg">Edit Payment</p>
              </button>
              <div className="editButton h-12" onClick={()=>setIsDelete(true)}>
                <Icon name="delete2" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="flex space-x-[190px] justify-start w-full ">
              <div className="flex flex-col space-y-4 w-[504px]">
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">City</p>
                  <p className="text-secondary w-[252px]">
                    {paymentData?.city?.city_eng}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Paayment Method Name</p>
                  <p className="text-secondary w-[252px]">
                    {paymentData?.name}
                  </p>
                </div>
              </div>
              {paymentData?.icon_url && (
                <img
                  src={paymentData?.icon_url}
                  alt="icon image"
                  className="w-[110px] h-[110px] self-center place-self-start"
                />
              )}
            </div>
          </div>
        </div>
      )}
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={
            "Are you sure to delete this define payment type? Please confirm it."
          }
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={deleteHandler}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={
            "The payment type is successfully deleted. Please check into list."
          }
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default PaymentMethodDetail;
