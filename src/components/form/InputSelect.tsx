/* eslint-disable */
import { Control, Controller, FieldValues } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import ChevronDown from "../../icons/chevronDown";

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string;
  control: any;
  fullWidth?: boolean;
  onChange?: (selectedValue: string) => void;
}

const InputSelect = ({
  name,
  label,
  options,
  defaultValue = "",
  control,
  fullWidth,
  onChange,
}: InputSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          select
          {...field}
          fullWidth={fullWidth ? true : false}
          defaultValue={defaultValue}
          SelectProps={{
            displayEmpty: true,
            inputProps: { "aria-label": "Without label" },
            IconComponent: () => <ChevronDown width={"5rem"} />,
            sx: {
              backgroundColor: "white",
              borderRadius:'10px',
              height:'48px',
              ".MuiFormLabel-root": {
                lineHeight: "13px",
              },
              ".MuiSelect-select em": {
                fontStyle: "normal",
              },
              ".MuiInputBase-root": {
                borderRadius: "10px",
                height: "48px",
              },
              ".MuiOutlinedInput-input": {
                outline: 'none',
                color: "#444240",
                fontSize: "20px",
                "::placeholder": {
                  fontSize: "20px",
                  color: "#868686",
                },
              },
              "@media (min-width: 768px)": {
                ".MuiOutlinedInput-input": {
                  fontSize: "16px", // Laptops
                  "::placeholder": {
                    fontSize: "16px",
                  },
                },
              },
              "@media (min-width: 1440px)": {
                ".MuiOutlinedInput-input": {
                  fontSize: "20px", // XL screens
                  "::placeholder": {
                    fontSize: "20px",
                  },
                },
              },
            },
          }}
          onChange={(e) => {
            field.onChange(e);
            onChange && onChange(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>{label}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default InputSelect;
