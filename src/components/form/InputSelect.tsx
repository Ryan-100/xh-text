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
	control:  Control<FieldValues, any>; 
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
