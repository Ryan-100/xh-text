import React from "react";
import InputField from "../../../components/form/InputFiled";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import MuiTextarea from "../../../components/form/TextArea";
import InputSelect from "../../../components/form/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { admin, auth } from "../../../store/actions";
import { getLocalStorageData, getToken } from "../../../service/auth";
import axios from "axios";
import AlertModal from "../../../components/Modal/AlertModal";

const ProfileEditComponent = () => {
  const token = getToken();
  const user_id = getLocalStorageData("user_id");
  const [data, setData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const [icon_url, setIcon_url] = React.useState<string>("");

  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAdminById = async () => {
    const res = await dispatch(auth.getAdminUserById(user_id) as any);
    if (res?.statusCode === 200) {
      setData(res?.data);
    }
  };

  const updateAdmin = async (data) => {
    try {
      const res = await dispatch(admin.updateAdmin(data, user_id) as any);
      if (res?.statusCode === 200) {
        setData(res?.data);
        setIsSuccess(true);
        setIsLoading(false);
        setNotFilled(false);
        setError("");
      } else {
        setError(res.message[0]);
      }
    } catch (e) {
      setError(e);
    }
  };

  React.useEffect(() => {
    getAdminById();
  }, []);

  const uploadImage = async (file) => {
    const res = await axios.post("http://64.23.137.248:2850/api/upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.status === 201) {
      setIcon_url(res?.data?.data?.data[0]);
      setIsLoading(false);
    }
  };

  const updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileData = event.target.files[0];

      if (fileData.size > 500 * 1024) {
        alert("File size exceeds the limit of 500 KB.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(fileData);
      setIsLoading(true);
      uploadImage({ file: fileData });
    }
  };

  const { all_counters } = useSelector((state: any) => state.counter);
  const { all_cities } = useSelector((state: any) => state.city);
  const { all_roles } = useSelector((state: any) => state.role);
  const { all_blocks } = useSelector((state: any) => state.block);
  const { all_regions } = useSelector((state: any) => state.region);

  const counterOptions = all_counters
    ? all_counters?.data?.map((counter) => ({
        value: counter.id,
        label: counter.name,
      }))
    : [];

  const cityOptions = all_cities
    ? all_cities?.data?.map((city) => ({
        value: city.id,
        label: city.city_eng,
      }))
    : [];

  const roleOptions = all_roles
    ? all_roles?.data?.map((role) => ({
        value: role.id,
        label: role.name,
      }))
    : [];
  const regionOptions = all_regions
    ? all_regions?.data?.map((region) => ({
        label: region.region_eng,
        value: region.id,
      }))
    : [];

  const blockOptions = all_blocks
    ? all_blocks?.data?.map((block) => ({
        value: block.id,
        label: block.block_eng,
      }))
    : [];

  const onSubmit = (submittedData) => {
    const {
      username = data.username,
      phone = data.phone,
      role_id = data.role_id,
      address = data.address,
      address_city_id = data.address_city_id,
      counter_id = data.counter_id,
      address_block_id = data.address_block_id,
      address_region_id = data.address_region_id,
      current_password,
      new_password,
      confirm_password,
    } = submittedData;
    if (
      username &&
      phone &&
      role_id &&
      address &&
      address_city_id &&
      counter_id &&
      address_block_id &&
      address_region_id
    ) {
      if (new_password === confirm_password) {
        updateAdmin({
          username,
          phone,
          profile_image_url: icon_url,
          city_id: address_city_id,
          role_id,
          password: confirm_password,
          address,
          address_city_id,
          counter_id,
          address_block_id,
          address_region_id,
          active: data.active,
        });
      } else {
        setError("Enter same password!");
      }
    } else {
      setNotFilled(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {data && (
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
            <p className="text-2xl font-semibold">
              Edit Profile{" "}
              <span className="text-gray">
                (Super Admin ID : SuperAdmin_HHW)
              </span>
            </p>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-4 border-r border-r-gray text-gray">
                Dashboard
              </p>{" "}
              <p className="py-2 px-4">Edit Profile</p>
            </div>
          </div>
          <div className="bg-white rounded-t-[10px] flex flex-col items-start p-6 space-y-6">
            <div className="flex space-x-6 justify-center items-center">
              <img
                src={
                  data.profile_image_url || icon_url
                    ? data.profile_image_url || icon_url
                    : "/person.png"
                }
                alt="profile"
                className="w-[252px] h-[252px]"
              />
              <div className="w-[252px] space-y-4">
                <label htmlFor="file-input" className="cursor-pointer">
                  <input
                    id="file-input"
                    type="file"
                    accept=".jpg,.png"
                    onChange={updateFile}
                    hidden
                  />
                  <div className="self-start rounded-[10px] w-[252px] bg-primary py-3 px-[46px] flex items-center space-x-2 text-white">
                    <Icon name="edit1" width={24} height={24} />
                    <p className="text-sm md:text-base xl:text-xl text-white">
                      Change Photo
                    </p>
                  </div>
                </label>

                <p className="text-bbase text-gray leading-6">
                  Acceptable formats : jpg, png only Max file size : 500 KB
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-2xl font-medium">Change Information</p>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  Name
                </p>
                <div className="w-[528px]">
                  <InputField
                    name="username"
                    control={control}
                    label={""}
                    defaultValue={data.username}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  Phone
                </p>
                <div className="w-[528px]">
                  <InputField
                    name="phone"
                    type="number"
                    control={control}
                    label={""}
                    defaultValue={data.phone}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  Role
                </p>
                <div className="w-[528px]">
                  <InputSelect
                    fullWidth
                    name="role_id"
                    control={control}
                    label={""}
                    defaultValue={data.role_id}
                    options={roleOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-transparent flex flex-col items-start p-6 space-y-6">
            <div className="flex flex-col space-y-4">
              <p className="text-2xl font-medium">Change Password</p>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  Current Password
                </p>
                <div className="w-[528px]">
                  <InputField
                    name="current_password"
                    password
                    placeholder="Enter Current Password"
                    control={control}
                    label={""}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  New Password
                </p>
                <div className="w-[528px]">
                  <InputField
                    name="new_password"
                    password
                    placeholder="Enter New Password"
                    control={control}
                    label={""}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  Confirm Password
                </p>
                <div className="w-[528px]">
                  <InputField
                    name="confirm_password"
                    password
                    placeholder="Confirm New Password"
                    control={control}
                    label={""}
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
                  Current Address
                </p>
                <div className="w-[528px]">
                  <MuiTextarea
                    name="current_address"
                    control={control}
                    placeholder="Enter Current Address"
                    defaultValue={data.address}
                    rows={3.5}
                    label={""}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  City
                </p>
                <div className="w-[528px]">
                  <InputSelect
                    fullWidth
                    name="address_city_id"
                    control={control}
                    label={""}
                    defaultValue={data.address_city_id}
                    options={cityOptions}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  Counter
                </p>
                <div className="w-[528px]">
                  <InputSelect
                    fullWidth
                    name="counter_id"
                    control={control}
                    label={""}
                    defaultValue={data.counter_id}
                    options={counterOptions}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-[780px]">
                <p className="text-sm md:text-base xl:text-xl text-gray">
                  Block
                </p>
                <div className="w-[528px]">
                  <InputSelect
                    fullWidth
                    name="address_block_id"
                    control={control}
                    label={""}
                    defaultValue={data.address_block_id}
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
                    label={""}
                    defaultValue={data.address_region_id}
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
                    defaultValue={data.address}
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
      )}
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"Profile has been edited successfully."}
      />
      <AlertModal
        open={isLoading}
        onClose={() => {}}
        title={"Loading"}
        body={"Please wait while image is uplading..."}
      />
      <AlertModal
        open={notFilled}
        onClose={() => setNotFilled(false)}
        title={"Alert"}
        body={"Kindly fill all fields with the necessary information."}
      />
      <AlertModal
        open={error ? true : false}
        onClose={() => setError("")}
        title={"Alert"}
        body={error}
      />
    </>
  );
};

export default ProfileEditComponent;
