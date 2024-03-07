import React from "react";
import InputField from "../../components/form/InputFiled";
import Button from "../../components/form/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../store/actions";
import { logout } from "../../service/auth";

export type LoginFormValue = {
  username: string;
  password: string;
};

const Login = () => {
  const { control, handleSubmit, watch } = useForm<LoginFormValue>({
    mode: "onChange",
    defaultValues: {
      password: "",
      username: "",
    },
  });
  React.useEffect(()=>{
    logout();
  },[])
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.username && data.password) {
      const res = await dispatch(
        auth.login({
          username: "*&%$#@@#$%&**&%$#@@#$%&*",
          password: "3c6c237547b4668aece99321e387d9f0",
        }) as any
      );
      if (res.statusCode === 201) {
        console.log(res, "res");
        navigate("/dashboard");
      }
    }
  };

  return (
    <main className="flex relative h-screen items-center bg-bright-ascent">
      <img
        src="/bg.png"
        alt="bg"
        className="absolute bottom-0 left-0 object-fit w-full h-[90vh] z-0"
      />
      <img
        src="/logo.png"
        alt="Logo"
        className="absolute w-[100px] h-[122px] xl:w-[166px] xl:h-[202px] top-[56px] left-[80px] xl:top-[96px] xl:left-[144px] object-fit"
      />
      <div className="relative flex items-center justify-center w-full">
        <div className=" bg-white p-10 rounded-md">
          <div className="flex justify-center">
            <p className="text-lg md:text-2xl xl:text-3.5xl font-medium tracking-wider text-primary">
              LOGIN
            </p>
          </div>
          <form
            className="w-[240px] space-y-4 mt-8 md:w-[328px] xl:w-[528px] xl:space-y-8 xl:mt-14"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              label="Admin ID"
              placeholder="Enter Admin ID"
              name={"username"}
              control={control}
            />
            <InputField
              label="Password"
              placeholder="Enter Password"
              password
              name={"password"}
              control={control}
            />
            <Button type={"button"} className="mt-3 xl:mt-6 w-full ">
              Login
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
