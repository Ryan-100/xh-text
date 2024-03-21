import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useDispatch } from "react-redux";
import { currency } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import { formatDate } from "../../../utils";

const CurrencyDetail = () => {
  const [currencyData, setCurrencyData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState<boolean>();
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

  const deleteHandler = async () => {
    const res = await dispatch(currency.deleteCurrency(currencyId) as any);
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
      {currencyData && (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="title">Currency Detail</p>
            <div className="side-title  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Currency
              </p>{" "}
              <p className=" py-2 px-2">Currency Detail</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
            <div className="flex items-center justify-center space-x-[84px]">
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created Date</p>
                <p className="text-secondary leading-6">
                  {formatDate(currencyData?.created_at)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created By</p>
                <p className="text-secondary leading-6">
                  {currencyData?.created_user?.username || "Unknown"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div
                onClick={goToEdit}
                className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 "
              >
                <Icon name="edit1" width={24} height={24} />
                <p className="btn-lg">Edit Currency</p>
              </div>
              <div
                className="editButton h-12"
                onClick={() => setIsDelete(true)}
              >
                <Icon name="delete2" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="flex space-x-[190px] justify-start items-center w-full ">
              <div className="flex flex-col space-y-4 w-[504px]">
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Currency</p>
                  <p className="text-secondary w-[252px]">
                    {currencyData?.name}
                  </p>
                </div>
              </div>
              <img
                src="/admin.png"
                alt="profile"
                className="w-[99px] h-[89px] self-center place-self-start"
              />
            </div>
          </div>
        </div>
      )}
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={
            "Are you sure to delete this define currency? Please confirm it."
          }
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={deleteHandler}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={"The currency is successfully deleted. Please check into list."}
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default CurrencyDetail;
