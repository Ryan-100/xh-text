import React, { useState, useCallback } from "react";
import { useController, UseControllerProps, Control } from "react-hook-form";
import EyeOff from "../../icons/eyeOff";
import Eye from "../../icons/eye";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  message?: undefined | string;
  control: Control<any>;
  password?: boolean;
  endPrefix?: string;
}

const InputField = ({
  className,
  label,
  password = false,
  name,
  type,
  message,
  control,
  endPrefix,
  ...props
}: InputProps & UseControllerProps<any>) => {
  const { field } = useController({
    name,
    control,
  });

  let defaultShowPassword = !password;

  const [showPassword, setShowPassword] =
    useState<boolean>(defaultShowPassword);

  const TogglePassword = useCallback(() => {
    setShowPassword((prev: boolean) => !prev);
  }, []);

  return (
    <div className="">
      <div>
        {label && (
          <label className="text-[14px] xl:text-[20px] inline-block mb-1 ">
            {label}
          </label>
        )}
        <div
          className={
            "flex w-full items-center rounded-[10px]  border border-gray-light bg-white px-4 py-2 text-sm h-12" +
            className
          }
        >
          <input
            {...field}
            type={(password && showPassword) ? "text" : (type === 'number' ? 'number' : (password ? 'password' : 'text'))}
            max={type === "number" ? 100000 : undefined}
            className="outline-none w-full bg-white text-secondary placeholder:text-gray-light leading-4 md:leading-6 xl:leading-8 text-base xl:text-xl placeholder:text-base placeholder:xl:text-xl"
            {...props}
          />
          {endPrefix && <p>{endPrefix}</p>}
          {password && (
            <button type="button" onClick={TogglePassword}>
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
      {message && <p className="text-xs  text-red-500">{message}</p>}
    </div>
  );
};

export default InputField;
