import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useDispatch, useSelector } from "react-redux";
import { city } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const EditCity = () => {
  const [cityData, setCityData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [notFilled, setNotFilled] = React.useState(false);

  const navigate = useNavigate();
  const { id: cityId } = useParams();
  const dispatch = useDispatch();
  const { control, handleSubmit,setValue } = useForm({defaultValues:{
    city_mm:cityData?.city_mm,
    city_cha:cityData?.city_cha,
    city_eng:cityData?.city_eng,
    currency_id:cityData?.currency_id,
    prefix:cityData?.prefix,
  }});

  const {all_currency}= useSelector((state:any)=>state.currency)


  React.useEffect(() => {
    const fetchCityDetail = async () => {
      try {
        const res = await dispatch(city.getCityById(cityId) as any);
        setCityData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCityDetail();
  }, [dispatch, cityId]);

  React.useEffect(()=>{
    setValue("city_mm", cityData?.city_mm);
    setValue("city_cha", cityData?.city_cha);
    setValue("city_eng", cityData?.city_eng);
    setValue("prefix", cityData?.prefix);
    setValue("currency_id", cityData?.currency_id);
  },[cityData])

  const updateCity = async (data) => {
    const res = await dispatch(city.updateCity(cityId, data) as any);
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const currencyOptions = all_currency?.data?.map((currency) => ({
    value: currency.id,
    label: currency.name,
  }));

  const onSubmit = ({ city_mm, city_eng, city_cha, currency_id, prefix }) => {
    if (city_mm && city_eng && city_cha && currency_id && prefix) {
      updateCity({
        city_mm,
        city_eng,
        city_cha,
        currency_id,
        prefix,
      });
    } else {
      setNotFilled(true);
    }
  };

  return (
    <>
      {cityData && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <div className="text-center">
              <p className="title">Edit Branch</p>
            </div>
            <div className="side-title  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Branch
              </p>
              <p className="py-2 px-2">Edit Branch</p>
            </div>
          </div>
          <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                City Name(mm)
              </p>
              <div className="w-[528px]">
                <InputField
                  name="city_mm"
                  control={control}
                  label={""}
                  placeholder="Enter City Name (Burmese)"
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                City Name(cha)
              </p>
              <div className="w-[528px]">
                <InputField
                  name="city_cha"
                  control={control}
                  label={""}
                  placeholder="Enter City Name (Chinese)"
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                City Name(eng)
              </p>
              <div className="w-[528px]">
                <InputField
                  name="city_eng"
                  control={control}
                  label={""}
                  placeholder="Enter City Name (English)"
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Prefix
              </p>
              <div className="w-[528px]">
                <InputField
                  name="prefix"
                  control={control}
                  label={""}
                  placeholder="Enter Prefix"
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Currency
              </p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="currency_id"
                  control={control}
                  defaultValue={cityData?.currency_id}
                  label={"Select currency for city"}
                  options={currencyOptions}
                />
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
        body={"This City has been edited successfully."}
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

export default EditCity;
