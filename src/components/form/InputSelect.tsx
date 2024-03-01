// Select.js

import React from "react";
import { Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import ChevronDown from "../../icons/chevronDown";

const InputSelect = ({ name, label, options, control, fullWidth }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          select
          sx={{
            backgroundColor: "white",
            ".MuiFormLabel-root": {
              lineHeight: "13px",
            },
            ".MuiInputBase-root": {
              borderRadius:'10px',
            },
            ".MuiOutlinedInput-input": {
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
          }}
          {...field}
          fullWidth={fullWidth ? true : false}
          SelectProps={{
            displayEmpty:true,
            inputProps:{'aria-label': 'Without label' },
            IconComponent: () => <ChevronDown width={"5rem"} />, 
            sx: {
              ".MuiSelect-select": {
                maxHeight: "48px",
                paddingY: "8px",
                borderRadius: "10px",
              },
              ".MuiSelect-outlined": {
                zIndex: 1,
              },
            },
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
