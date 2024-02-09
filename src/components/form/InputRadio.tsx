import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel, FormControlLabelProps, FormControlProps } from '@mui/material';

interface MUIRadioGroupProps {
  name: string;
  control: Control<any>;
  options: { label: string; value: string }[];
  formControlProps?: FormControlProps;
  formControlLabelProps?: FormControlLabelProps;
}

const MUIRadioGroup: React.FC<MUIRadioGroupProps> = ({ name, control, options, formControlProps, formControlLabelProps }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup {...field} {...formControlProps} row>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
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
