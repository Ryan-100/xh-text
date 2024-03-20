import React from "react";
import { useDispatch } from "react-redux";
import MaterRoutes from "./routes";
import {
  block,
  city,
  counter,
  currency,
  module,
  parcel,
  region,
  role,
  weight,
} from "./store/actions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getLocalStorageData,
  getRefreshToken,
  setRefreshToken,
  setToken,
} from "./service/auth";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(city.getAllCities() as any),
          dispatch(currency.getAllCurrency() as any),
          dispatch(weight.getAllWeight() as any),
          dispatch(parcel.getAllParcel() as any),
          dispatch(block.getAllblocks() as any),
          dispatch(region.getAllRegions() as any),
          dispatch(counter.getAllCounters() as any),
          dispatch(module.getModules() as any),
          dispatch(role.getAllRoles() as any),
        ]);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, [dispatch]);


	
	
  React.useEffect(() => {
		const refreshToken = async () => {
			const user_id = getLocalStorageData("user_id");
			let refresh_token = await getRefreshToken();

      const res = await axios.get(
        `http://64.23.137.248:2850/api/auth/refresh-token?id=${user_id}&refresh_token=${refresh_token}&app_type=adminUser`,
        {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        }
      );
      if (res?.status === 200) {
        setToken({
          j_token: res?.data?.data?.accessToken,
        });
        setRefreshToken({
          r_token: res?.data?.data?.refreshToken,
        });
      }
    };
      refreshToken();


    // Set up interval to call the function every hour
    const intervalId = setInterval(refreshToken, 300000); // 3600000 milliseconds = 1 hour

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MaterRoutes />
      </LocalizationProvider>
    </div>
  );
};

export default App;
