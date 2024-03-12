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

const CreateCounter = () => {
  const [notFilled, setNotFilled] = useState(false);
  const { control, handleSubmit, watch } = useForm({ mode: "onChange" });
  const [cityOptions, setCityOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const selectedCity = watch("address_city_id");
  const selectedBlock = watch("address_block_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch cities
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

  // Fetch blocks
  useEffect(() => {
    const fetchBlocks = async () => {
      if (selectedCity) {
        try {
          const res = await dispatch(block.getAllblocks() as any);
          const filteredBlocks = res.data.filter(
            (b) => b.city_id === selectedCity
          );
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

  // Fetch regions
  useEffect(() => {
    const fetchRegions = async () => {
      if (selectedBlock) {
        try {
          const res = await dispatch(region.getAllRegions() as any);
          const filteredRegions = res.data.filter(
            (r) => r.block_id === selectedBlock
          );
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

  const onSubmit = (data) => {
    // Construct the body from form data as needed
    const requestBody = {
      name: data.name,
      phone: data.phone,
      city_id: data.city_id,
      prefix: data.prefix,
      address_city_id: data.address_city_id,
      address_block_id: data.address_block_id,
      address_region_id: data.address_region_id,
      address: data.address,
      active: 1,
    };

    console.log(requestBody);
    dispatch(counter.createCounter(requestBody) as any)
      .then((response) => {
        // Handle successful counter creation
        console.log("Counter created successfully:", response);
        navigate("/counters");
      })
      .catch((error) => {
        // Handle error scenario
        console.error("Error creating counter:", error);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="flex justify-between items-center mb-[2px]">
          <div
            // onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <p className="text-2xl font-semibold">Create Counter </p>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Counter
            </p>{" "}
            <p className="py-2 px-2">Create Counter</p>
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
                  label={"Select your branch"}
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
                  label={"Select your branch"}
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
                  label={"Select Block"}
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
                  label={"Select Region Type"}
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

export default CreateCounter;
