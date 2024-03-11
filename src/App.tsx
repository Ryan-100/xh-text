import React from "react";
import { useDispatch } from "react-redux";
import MaterRoutes from "./routes";
import { city, currency, parcel, weight } from "./store/actions";

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
      <MaterRoutes />
    </div>
  );
};

export default App;
