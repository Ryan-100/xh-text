import { Outlet } from "react-router-dom";

const Outleting = () => {
  return (
    <div className="h-auto overflow-auto bg-bright-ascent">
      <Outlet />
    </div>
  );
};

export default Outleting;
