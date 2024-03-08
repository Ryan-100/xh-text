import React from "react";
import { Divider } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../../icons";
import { useDispatch } from "react-redux";
import moment from "moment";
import Modal from "../../components/Modal";
import { counter } from "../../store/actions";

const CounterDetail = () => {
  const [counterData, setCounterData] = React.useState<any>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [relevantCounter, setRelevantCounter] = React.useState<any>(); // Define relevantCounter state

  const navigate = useNavigate();
  const { id: counterId } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchCountersBasedOnPrefix = async () => {
      try {
        const allCountersRes = await dispatch(counter.getAllCounters() as any);
        const relevantCounter = allCountersRes.data.find(
          (c) => c.id.toString() === counterId
        );

        if (relevantCounter) {
          setRelevantCounter(relevantCounter); // Set relevantCounter state
          try {
            if (relevantCounter.prefix === "JIA") {
              const detailRes = await dispatch(
                counter.getCounterById(relevantCounter.id) as any
              );
              setCounterData(detailRes.data);
            } else if (relevantCounter.prefix === "LA") {
              const detailRes = await dispatch(
                counter.getOtherCounterById(relevantCounter.id) as any
              );
              setCounterData(detailRes.data);
            }
          } catch (error) {
            console.error("Error fetching counter details:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching counters:", error);
      }
    };
    fetchCountersBasedOnPrefix();
  }, [dispatch, counterId]);

  const goBack = () => {
    navigate(-1);
  };

  const goToEdit = () => {
    navigate(`/counters/edit/${counterId}`);
  };

  const fromDate = moment("12-08-2022", "DD-MM-YYYY").format("YYYY-MM-DD");
  const toDate = moment("12-08-2022", "DD-MM-YYYY").format("YYYY-MM-DD");
  const skip = 0; 
  const take = 10; 
  const parcelType = "scan";

  const detailPath = `from_date=${fromDate}&to_date=${toDate}&skip=${skip}&take=${take}&parcel_type=${parcelType}`;

  const deleteHandler = () => {};
  console.log(counterData, "counter data");
  return (
    <>
      {counterData && (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="text-2xl font-semibold">Counter Detail</p>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-4 border-r border-r-gray text-gray">
                Counter
              </p>{" "}
              <p className=" py-2 px-4">Counter Detail</p>
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center space-x-[84px]">
                <div className="flex flex-col">
                  <p className="text-gray leading-6">Joined Date</p>
                  <p className="text-secondary leading-6">
                    {moment(counterData?.created_at).format("D MMM YYYY")}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray leading-6">Now</p>
                  <p className="text-secondary leading-6">
                    {moment(new Date()).format("D MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div
                  onClick={goToEdit}
                  className="self-start cursor-pointer rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
                >
                  <Icon name="edit1" width={24} height={24} />
                  <p className="text-[20px] text-white">Edit Information</p>
                </div>
                <div
                  className="editButton h-12"
                  onClick={() => setIsDelete(true)}
                >
                  <Icon name="delete2" />
                </div>
              </div>
            </div>
            <Divider className="w-full" />
            <div className="flex space-x-[176px] justify-start w-full">
              <div className="flex flex-col">
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
                  <p className="text-gray">City</p>
                  <p className="text-secondary w-[235px]">
                    {counterData?.city?.city_eng}
                  </p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Counter</p>
                  <p className="text-secondary w-[235px]">
                    {counterData?.name}
                  </p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
                  <p className="text-gray">Password</p>
                  <p className="text-secondary w-[235px]">123456</p>
                </div>
                <div className="h-fit w-[411px] py-3 px-4 flex items-start justify-between ">
                  <p className="text-gray">Address</p>
                  <p className="text-secondary w-[235px]">
                    {counterData?.address}
                  </p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1 mb-6">
                  <p className="text-gray">Created By</p>
                  <p className="text-secondary w-[235px]">
                    {counterData?.created_by}
                  </p>
                </div>
              </div>
              <img
                src="/counter.svg"
                alt="profile"
                className="w-[247px] h-[184px] self-center place-self-start"
              />
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow p-6 grid grid-cols-12 grid-rows-1">
            {relevantCounter && (
              <>
                {relevantCounter.prefix === "JIA" && (
                  <>
                    <div className="w-[136px] col-span-2 flex flex-col space-y-2">
                      <p className="h-[48px] text-gray">Total Admins</p>
                      <p className="h-[48px] text-gray">Scan Parcels </p>
                      <p className="h-[48px] text-gray">Customized Parcels</p>
                    </div>
                    <div className="w-[253px]   col-span-2 flex flex-col space-y-2">
                      <p className="h-[48px]">{counterData?.total_admin}</p>
                      <p className="h-[48px]">
                        {counterData?.total_scan_parcels}
                      </p>
                      <p className="h-[48px]">
                        {counterData?.total_customize_parcels}
                      </p>
                    </div>
                    <div className=" col-span-2 flex flex-col space-y-2">
                      <p className="h-[48px] text-primary">View All</p>
                      <p className="h-[48px] text-primary">View All</p>
                      <Link
                        to={detailPath}
                        className="text-primary hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                  </>
                )}

                {relevantCounter.prefix === "LA" && (
                  <>
                    <div className="w-[136px] col-span-2 flex flex-col space-y-2">
                      <p className="h-[48px] text-gray">Total Admins</p>
                      <p className="h-[48px] text-gray">Total Riders</p>
                      <p className="h-[48px] text-gray">
                        Total Scanned Packages
                      </p>
                    </div>
                    <div className="w-[253px] col-span-2 flex flex-col space-y-2">
                      <p className="h-[48px]">{counterData?.total_admin}</p>
                      <p className="h-[48px]">{counterData?.total_riders}</p>
                      <p className="h-[48px]">
                        {counterData?.total_scan_parcels}
                      </p>
                    </div>
                    <div className=" col-span-2 flex flex-col space-y-2">
                      <p className="h-[48px] text-primary">View All</p>
                      <p className="h-[48px] text-primary">View All</p>
                      <p className="h-[48px] text-primary">View All</p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {isDelete && (
        <Modal
          title="Confirm"
          body={"Are you sure to delete this counter? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={deleteHandler}
        />
      )}
    </>
  );
};

export default CounterDetail;
