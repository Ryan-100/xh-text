import React from "react";
import { Controller, Control, UseControllerProps } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";
import Check from "../../icons/Check";
import CheckBorder from "../../icons/CheckBorder";

interface MUICheckboxProps {
  name: string;
  control: Control<any>;
  label?: string;
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
  formControlLabelProps?: FormControlLabelProps;
}

const MUICheckbox: React.FC<MUICheckboxProps> = ({
  name,
  control,
  label,
  checkboxProps,
  formControlLabelProps,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              {...checkboxProps}
              checkedIcon={<Check width='32' height='32' />}
              icon={<CheckBorder width='32' height='32' />}
            />
          }
          label={label}
          {...formControlLabelProps}
        />
      )}
    />
  );
};

export default MUICheckbox;
