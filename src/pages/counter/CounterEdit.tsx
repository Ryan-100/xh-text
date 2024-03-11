import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../icons";
import InputField from "../../components/form/InputFiled";
import MuiTextarea from "../../components/form/TextArea";
import InputSelect from "../../components/form/InputSelect";
import AlertModal from "../../components/Modal/AlertModal";
import { useDispatch } from "react-redux";
import { block, city, counter, region } from "../../store/actions";

const CounterEdit = () => {
  const [counterData, setCounterData] = React.useState<any>();
  const [success, setSuccess] = React.useState<boolean>(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
 
  const { control, handleSubmit,setValue, watch  } = useForm({ mode: "onChange" });
  const selectedCity = watch("address_city_id");
  const selectedBlock = watch("address_block_id");
  const navigate = useNavigate();
  const { id: counterId } = useParams();
  const dispatch = useDispatch();

    React.useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await dispatch(counter.getCounterById(counterId) as any);
        console.log( res)
        setCounterData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCounter();
  }, [dispatch, counterId]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await dispatch(city.getAllCities() as any);
        const options = res.data.map((item) => ({
          label: item.city_eng, 
          value: item.id, 
        }));
        setCityOptions(options);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [dispatch]);

  useEffect(() => {
    const fetchBlocks = async () => {
      if (selectedCity) {
        try {
          const res = await dispatch(block.getAllBlock() as any);
          const filteredBlocks = res.data.filter((b) => b.city_id === selectedCity);
          const options = filteredBlocks.map((block) => ({
            label: block.block_eng, 
            value: block.id, 
          }));
          setBlockOptions(options);
        } catch (error) {
          console.error("Error fetching blocks:", error);
        }
      } else {
        setBlockOptions([]);
      }
    };
    fetchBlocks();
  }, [dispatch, selectedCity]);

  useEffect(() => {
    const fetchRegions = async () => {
      if (selectedBlock) {
        try {
          const res = await dispatch(region.getAllRegion() as any);
          const filteredRegions = res.data.filter((r) => r.block_id === selectedBlock);
          const options = filteredRegions.map((region) => ({
            label: region.region_eng, 
            value: region.id, 
          }));
          setRegionOptions(options);
        } catch (error) {
          console.error("Error fetching regions:", error);
        }
      } else {
        setRegionOptions([]);
      }
    };
    fetchRegions();
  }, [dispatch, selectedBlock]);

  useEffect(() => {
    // Fetch initial counter data and set up the form
    const fetchCounter = async () => {
      try {
        const response = await dispatch(counter.getCounterById(counterId) as any);
        const data = response.data;
        setCounterData(data);
        // Set form values
        setValue('name', data.name);
        setValue('phone', data.phone);
        setValue('city_id', data.city_id);
        setValue('prefix', data.prefix);
        setValue('address_city_id', data.address_city_id);
        setValue('address_block_id', data.address_block_id);
        setValue('address_region_id', data.address_region_id);
        setValue('address', data.address);
        setValue('active', data.active);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };

    fetchCounter();
  }, [dispatch, setValue, counterId]);

  // Fetch cities, blocks, and regions as needed
  // ...

  // The form submission handler
  const onSubmit = (formData) => {
    // Construct the request body from the form data
    const updatedData = {
      name: formData.name,
      phone: formData.phone,
      city_id: formData.city_id,
      prefix: formData.prefix,
      address_city_id: formData.address_city_id,
      address_block_id: formData.address_block_id,
      address_region_id: formData.address_region_id,
      address: formData.address,
      active: formData.active ?? 1, // Use formData.active if it exists, otherwise default to 1
    };

    // Dispatch the update counter action
    dispatch(counter.updateCounter(counterId, updatedData) as any)
    .then((response) => {
      // Handle successful counter creation
      console.log("Counter created successfully:", response);
      navigate("/counters");
    })
    .catch((error) => {
        console.error('Error updating counter:', error);
        // Handle the error scenario
      });
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
        <div className="flex justify-between items-center mb-[2px]">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <p className="text-2xl font-semibold">Edit Counter </p>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Counter
            </p>{" "}
            <p className="py-2 px-2">Edit Counter</p>
          </div>
        </div>

        <div className="bg-white rounded-t-[10px] flex flex-col items-start p-6 space-y-6">
          <div className="flex flex-col space-y-4">
            <p className="text-2xl font-medium">Change Information</p>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Counter Name
              </p>
              <div className="w-[528px]">
                <InputField
                  name="name"
                  control={control}
                  label={""}
                  placeholder="Enter Counter Name"
                  />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                City Branch
              </p>
              <div className="w-[528px]">
                <InputSelect
                  label={counterData?.city?.city_eng}
                  fullWidth
                  name="city_id"
                  control={control}
                  options={cityOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Counter Phone
              </p>
              <div className="w-[528px]">
                <InputField
                  name="phone"
                  control={control}
                  label={""}
                  placeholder="Enter Counter Phone"
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
          </div>
        </div>
        <div className="bg-white rounded-b-[10px] flex flex-col items-start p-6 space-y-6">
          <div className="flex flex-col space-y-4">
            <p className="text-2xl font-medium">Change Address</p>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                City Branch
              </p>
              <div className="w-[528px]">
                <InputSelect
                  label={counterData?.address_city?.city_eng}
                  fullWidth
                  name="address_city_id"
                  control={control}
                  options={cityOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">Block</p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="address_block_id"
                  control={control}
                  label={counterData?.address_block?.block_eng}
                  options={blockOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Region Type
              </p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="address_region_id"
                  control={control}
                  label={counterData?.address_region?.region_eng}
                  options={regionOptions}
                />
              </div>
            </div>

            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Address Detail
              </p>
              <div className="w-[528px]">
                <MuiTextarea
                  name="address"
                  control={control}
                  placeholder="Enter New Address"
                  rows={2.5}
                  label={""}
                />
              </div>
            </div>
          </div>
        </div>

        <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
          <Icon name="save" width={16} height={16} />
          <p className="text-[20px] text-white">Save Updates</p>
        </button>
      </form>
      <AlertModal
        title="Alert"
        body="Kindly fill all fields with the necessary information."
        open={notFilled}
        onClose={() => setNotFilled(false)}
      />
    </>
  );
};

export default CounterEdit;
