import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { role } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const AdminRoleEdit = () => {
  const [roleData, setRoleData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [notFilled, setNotFilled] = React.useState(false);

  const navigate = useNavigate();
  const { id: roleId } = useParams();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({defaultValues:{
    name:roleData?.name,
    description:roleData?.description,
  }});


  React.useEffect(() => {
    const fetchRoleDetail = async () => {
      try {
        const res = await dispatch(role.getRoleById(roleId) as any);
        setRoleData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchRoleDetail();
  }, [dispatch, roleId]);

  const updateRole = async (data) => {
    const res = await dispatch(role.updateRole(roleId, data) as any);
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = ({ name=roleData?.name, description=roleData?.description }) => {
    if (name && description ) {
      updateRole({
        name,
        description,
      });
    } else {
      setNotFilled(true);
    }
  };

  return (
    <>
    
   {roleData && <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-[2px]">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <p className="title">Edit Admin Role</p>
        <div className="side-title  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Admin Role</p>
          <p className=" py-2 px-2">Edit Admin Role</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
        <div className="flex space-x-6 justify-start w-full ">
          <div className="flex flex-col space-y-4 w-[780px]">
          <div className="h-12 w-full py-3 px-4 flex items-center">
              <p className="text-gray w-[252px] text-xl">City</p>
              <p className="text-secondary w-[252px] text-xl">{roleData?.city?.city_eng}</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-start ">
              <p className="text-gray w-[252px] text-xl">Counter</p>
              <p className="text-secondary w-[252px] text-xl">{roleData?.counter?.name}</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center mb-6">
              <p className="text-gray w-[252px] text-xl">Role Name</p>
              <div className="w-[528px]">
                <InputField
                  name="name"
                  control={control}
                  label={""}
                  placeholder="Enter Role Name"
                  defaultValue={roleData?.name}
                />
              </div>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center mb-6">
              <p className="text-gray w-[252px] text-xl">Role Description</p>
              <div className="w-[528px]">
                <InputField
                  name="description"
                  control={control}
                  label={""}
                  placeholder="Enter Role Description"
                  defaultValue={roleData?.description}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
        <Icon name="save" width={16} height={16} />
        <p className="btn-lg">Save Updates</p>
      </button>
    </form>}
    <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"This admin role has been edited successfully."}
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

export default AdminRoleEdit;
