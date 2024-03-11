import React from "react";
import { useDispatch } from "react-redux";
import MaterRoutes from "./routes";
import { city, currency, parcel, weight } from "./store/actions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		try {
			dispatch(city.getAllCities() as any);
			dispatch(currency.getAllCurrency() as any);
			dispatch(weight.getAllWeight() as any);
			dispatch(parcel.getAllParcel() as any);
		} catch (error) {
			console.error("Error fetching:", error);
		}
	}, [dispatch]);
	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<MaterRoutes />
			</LocalizationProvider>
		</div>
	);
};

export default App;
