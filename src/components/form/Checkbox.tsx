import React from 'react';
import { Controller, Control, UseControllerProps } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material';

interface MUICheckboxProps {
  name: string;
  control: Control<any>;
  label?: string;
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
  formControlLabelProps?: FormControlLabelProps;
}

const MUICheckbox: React.FC<MUICheckboxProps> = ({ name, control, label, checkboxProps, formControlLabelProps }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} {...checkboxProps} />}
          label={label}
          {...formControlLabelProps}
        />
      )}
    />
  );
};

export default MUICheckbox;
