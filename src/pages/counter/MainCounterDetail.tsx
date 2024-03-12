import React, { useEffect, useRef, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Datatable from "../../components/table/datatable";
import {  useLocation, useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";

import client from "../../controller/constant/HttpClient";
import Icon from "../../icons";

const CounterList = () => {
  const [data, setData] = useState();

  const apiRef = useRef(null);
  const navigate = useNavigate();
  const [value, setValue] = React.useState({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(`counter/main-counter/parcel/detail${location.search}`);
        if (response.data && response.data.data) {
          console.log(response)
          setData(response.data.data.data); 
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [location.search]);

 

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "Date", width: 100 },
    {
      field: "customer_id",
      headerName: "Scanned Parcels",
      width: 371,
    },
    {
      field: "customer_id",
      headerName: "Scanned Parcels",
      width: 371,
    },
   
  ];

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
     {data && <div className="">
     <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="text-2xl font-semibold">Counter Detail</p>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-4 border-r border-r-gray text-gray">
                Counter
              </p>{" "}
              <p className=" py-2 px-4">Counter Detail</p>
            </div>
          </div>
         <div className="w-full mt-8 flex justify-end items-center mb-6">
            <div className=" w-1/3">
              <Datepicker
                value={value}
                onChange={handleValueChange}
                inputClassName="h-12 w-full placeholder:text-base outline-none border border-gray-light rounded-[10px] pl-6"
              />
            </div>
          </div>
        <Datatable
          rows={data}
          columns={amountColumns.concat()}
          apiRef={apiRef}
        />
      </div>}
    </>
  );
};

export default CounterList;
