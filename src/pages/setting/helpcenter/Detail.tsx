import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useDispatch } from "react-redux";
import { help } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import { formatDate } from "../../../utils";

const HelpCenterDetail = () => {
  const [helpCenter, setHelpCenter] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: helpCenterId } = useParams();

  React.useEffect(() => {
    const fetchCenterDetail = async () => {
      try {
        const res = await dispatch(help.getHelpCenterById(helpCenterId) as any);
        setHelpCenter(res?.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchCenterDetail();
  }, [dispatch, helpCenterId]);

  const deleteHandler = async () => {
    const res = await dispatch(help.deleteCenter(helpCenterId) as any);
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
      {helpCenter && (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="title">Help Center Detail</p>
            <div className="side-title  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Help Center
              </p>{" "}
              <p className=" py-2 px-2">Help Center Detail</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
            <div className="flex items-center justify-center space-x-[84px]">
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created Date</p>
                <p className="text-secondary leading-6">
                  {formatDate(helpCenter?.created_at)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created By</p>
                <p className="text-secondary leading-6">
                  {helpCenter?.created_user?.username || "Unknown"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div
                onClick={goToEdit}
                className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 "
              >
                <Icon name="edit1" width={24} height={24} />
                <p className="btn-lg">Edit Help Center</p>
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
                  <p className="text-gray">City</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.city?.city_eng}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Hotline Phone</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.hotline_phone}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Address</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.address}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Email</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.email}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Time</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.time}
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
          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
              <div className="flex flex-col space-y-4 w-[504px]">
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Facebook</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.facebook}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Viber Phone</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.viber_phone}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Telegram</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.telegram_phone}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">YouTube</p>
                  <p className="text-secondary w-[252px]">
                    {helpCenter?.youtube}
                  </p>
                </div>
               
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

export default HelpCenterDetail;
