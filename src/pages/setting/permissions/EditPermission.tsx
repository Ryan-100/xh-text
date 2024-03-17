import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import MUICheckbox from "../../../components/form/Checkbox";
import AlertModal from "../../../components/Modal/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageData } from "../../../service/auth";
import { PermissionInterface, permission } from "../../../store/actions";

const PermissionEdit = () => {
  const [permissionData, setPermissionData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit,setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: permissionId } = useParams();

  React.useEffect(() => {
    const fetchCityDetail = async () => {
      try {
        const res = await dispatch(
          permission.getPermissionById({ id: permissionId }) as any
        );
        setPermissionData(res?.data[0]);
      // Assuming you have a function called `setValue` to set values
      res?.data[0]?.role_item_detail?.forEach(item => {
          setValue(item.module.id.toString(), item.is_access === 1 ? true : undefined);
      });
      
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCityDetail();
  }, [dispatch, permissionId]);

  const { all_cities } = useSelector((state: any) => state.city);
  const { all_counters } = useSelector((state: any) => state.counter);
  const { all_roles } = useSelector((state: any) => state.role);

  const user_id = getLocalStorageData("user_id");

  const updatePermission = async (data: PermissionInterface) => {
    const res = await dispatch(
      permission.updatePermission(data) as any
    );
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
    }
  };

  const cityOptions = all_cities
    ? all_cities?.data?.map((city) => ({
        value: city.id,
        label: city.city_eng,
      }))
    : [];
  const counterOptions = all_counters
    ? all_counters?.data?.map((counter) => ({
        value: counter.id,
        label: counter.name,
      }))
    : [];
  const roleOptions = all_roles
    ? all_roles?.data?.map((role) => ({
        value: role.id,
        label: role.name,
      }))
    : [];

  const onSubmit = (data) => {
    const { city_id=permissionData?.city_id, counter_id=permissionData?.counter_id, role_id=permissionData?.role_id, ...accessData } = data;
    console.log(accessData,'accessData')
    const roleItem = [];
    for (
      let moduleId = 1;
      moduleId <= Object.keys(accessData)?.length - 1;
      moduleId++
    ) {
      const isAccess = accessData[String(moduleId)] ? 1 : 0;
      roleItem.push({
        module_id: moduleId,
        role_id,
        is_access: isAccess,
      });
    }
    if (city_id && counter_id && role_id && user_id && roleItem.length > 0) {
      updatePermission({
        city_id,
        counter_id,
        role_id,
        created_by: user_id,
        roleItem,
      });
    } else {
      setNotFilled(true);
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  console.log(permissionData, "pd");
  return (
    <>
      {permissionData && cityOptions && counterOptions && roleOptions && (
        <form
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
              <p className="text-2xl font-semibold">Edit Permission</p>
            </div>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Permission
              </p>
              <p className="py-2 px-2">Edit Permission</p>
            </div>
          </div>
          <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">City</p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="city_id"
                  defaultValue={permissionData?.city_id}
                  control={control}
                  label={"Choose city name"}
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
                  defaultValue={permissionData?.counter_id}
                  control={control}
                  label={"Choose counter name"}
                  options={counterOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">Role</p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="role_id"
                  defaultValue={permissionData?.role_id}
                  control={control}
                  label={"Choose role name"}
                  options={roleOptions}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-t-[10px] flex flex-col items-start p-6 space-y-6 w-full">
            <div className="grid grid-cols-3 grid-rows-5 gap-2 w-full">
              {permissionData?.role_item_detail?.map((data) => (
                <MUICheckbox
                  key={data.module.id}
                  name={data.module.id.toString()}
                  defaultChecked={data.is_access===1?true:false}
                  control={control}
                  label={data.module.module}
                />
              ))}
            </div>
          </div>
          <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
            <Icon name="save" width={24} height={24} />
            <p className="text-[20px] text-white">Save Updates</p>
          </button>
        </form>
      )}
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New permission has been edited successfully."}
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

export default PermissionEdit;
