import React from 'react';
import { Controller,Control   } from 'react-hook-form';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface MUIInputProps {
  name: string;
  label: string;
  control: Control<any>;
  password?: boolean;
  type?:string;
  fullWidth?: boolean;
}


const MUIinput: React.FC<MUIInputProps> = ({ name, label,control, type='text', password,...rest }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          sx={{ '.MuiOutlinedInput-input': { maxHeight:'1rem',minHeight:'1rem',padding:'14px 10px'},}}
          type={showPassword?'password':type}
          {...field}
          label={label}
          InputProps={{
            ...(password && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }),
          }}
          {...rest}
        />
      )}
    />
  );
};

export default MUIinput;
