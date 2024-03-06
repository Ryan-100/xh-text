import React from "react";
import { useDispatch } from "react-redux";
import MaterRoutes from "./routes";
import { city } from "./store/actions";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      dispatch(city.getAllCities() as any);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  }, [dispatch]);
  return (
    <div>
      <MaterRoutes />
    </div>
  );
};

export default App;
