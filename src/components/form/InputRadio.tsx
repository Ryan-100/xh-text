import React from "react";
import { Controller, Control } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
} from "@mui/material";
import Icon from "../../icons";

interface MUIRadioGroupProps {
  name: string;
  control: Control<any>;
  options: { label: string; value: string | number }[];
  formControlProps?: FormControlProps;
  defaultValue?: any;
  formControlLabelProps?: FormControlLabelProps;
}

const MUIRadioGroup: React.FC<MUIRadioGroupProps> = ({
  name,
  control,
  options,
  defaultValue,
  formControlProps,
  formControlLabelProps,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <RadioGroup {...field} {...formControlProps} row>
          {options.map((option) => (
            <FormControlLabel
              sx={{
                bgcolor: "#fff",
                border: `1px solid ${field.value === option.value ? "#FF6604" : "#FFB381"}`,
                borderRadius: "10px",
                paddingg: "12px 16px",
                minWidth: "254px",
                height: "48px",
                marginRight: "32px",
              }}
              key={option.value}
              defaultValue={defaultValue}
              value={option.value}
              control={
                <Radio
                  icon={<Icon name="radio" width={24} height={24} />}
                  checkedIcon={
                    <Icon name="radio-check" width={24} height={24} />
                  }
                />
              }
              label={option.label}
              {...formControlLabelProps}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default MUIRadioGroup;
