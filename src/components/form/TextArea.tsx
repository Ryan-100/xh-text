import React from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

type MuiTextareaProps = {
  control: any; // Replace 'any' with the actual type of your control
  name: string;
  rows: number;
  label: string;
  placeholder: string;
  disabled?:boolean;
  defaultValue?: string;
};

const MuiTextarea = React.forwardRef<HTMLDivElement, MuiTextareaProps>(
  (
    { control, name, rows, label,disabled, placeholder, defaultValue = "", ...rest },
    ref
  ) => {
    const {
      field: { value, onChange, onBlur },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue,
    });

    return (
      <TextField
        ref={ref}
        multiline
        rows={rows}
        fullWidth
        disabled={disabled}
        sx={{
          ".MuiInputBase-root": {

            borderRadius:'10px',
          },
          ".MuiOutlinedInput-input": {
            color: "#444240",
            fontSize: "20px",
            '::placeholder': {
              fontSize: "20px",
              color: "#868686",
            },
          },
          '@media (min-width: 768px)': {
            ".MuiOutlinedInput-input": {
              fontSize: "16px", // Laptops
              '::placeholder': {
                fontSize: "16px",
              },
            },
          },
          '@media (min-width: 1440px)': {
            ".MuiOutlinedInput-input": {
              fontSize: "20px", // XL screens
              '::placeholder': {
                fontSize: "20px",
              },
            },
          },
        }}
        placeholder={placeholder}
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error ? error.message : ""}
        {...rest}
      />
    );
  }
);

export default MuiTextarea;
