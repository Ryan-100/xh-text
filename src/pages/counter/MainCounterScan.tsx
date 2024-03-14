import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";
import Icon from "../../icons";
import Datatable from "../../components/table/datatable";
import moment from "moment";
import Datepicker from "react-tailwindcss-datepicker";
import { counter } from "../../store/actions";
import { useDispatch } from "react-redux";
import client from "../../controller/constant/HttpClient";

const MainCounterScan = () => {
  const [data, setData] = useState([]);
  const [counterId, setCounterId] = useState(null);
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const location = useLocation();
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fromDateParam = searchParams.get("from_date");
    const toDateParam = searchParams.get("to_date");

    // If fromDateParam and toDateParam exist, set them as initial values
    if (fromDateParam && toDateParam) {
      setValue({
        startDate: moment(fromDateParam).toDate(),
        endDate: moment(toDateParam).toDate(),
      });
    }
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const counterId = searchParams.get("counter_id");
    const fromDate = searchParams.get("from_date");
    const toDate = searchParams.get("to_date");
    const skip = searchParams.get("skip");
    const take = searchParams.get("take");
    const parcelType = searchParams.get("parcel_type");

    const apiUrl = `counter/main-counter/parcel`;

    const fetchData = async () => {
      try {
        const response = await client.get(apiUrl, {
          params: {
            counter_id: counterId,
            from_date: value.startDate
              ? moment(value.startDate).format("YYYY-MM-DD") || fromDate
              : null,
            to_date: value.endDate
              ? moment(value.endDate).format("YYYY-MM-DD") || toDate
              : null,
            skip,
            take,
            parcel_type: parcelType,
          },
        });
        const mappedData = response.data.data.data.map((item, index) => ({
          id: index,
          ...item,
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (value.startDate && value.endDate) {
      fetchData();
    }
  }, [location.search, value.startDate, value.endDate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const counterIdParam = searchParams.get("counter_id");
    if (counterIdParam) {
      setCounterId(counterIdParam);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchParcel = async () => {
      if (counterId) {
        try {
          const res = await dispatch(counter.getCounterById(counterId) as any);
          if (res?.data) {
            setCityName(res.data.city?.city_eng);
          }
        } catch (error) {
          console.error("Error fetching counter:", error);
        }
      }
    };
    fetchParcel();
  }, [dispatch, counterId]);

  const goBack = () => navigate(-1);
  const formatDate = (dateString) => {
    return moment(dateString).format("D MMM YYYY");
  };

  const formatNumber = (num) => `${num.toLocaleString()} Ks`;

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  // const queryScanParamsDetail = new URLSearchParams({
  //   counter_id: counterId,
  //   from_date: moment().startOf('month').format('YYYY-MM-DD'),
  //   to_date: moment().format('YYYY-MM-DD'),
  //   skip: '0',
  //   take: '10',
  //   parcel_type: 'scan',
  // });

  // const detailPath = `/counters/main-counter-scan-parcel/scan-detail/detail?${queryScanParamsDetail.toString()}`;

  const columns: GridColDef[] = [
    {
      field: "formatted_date",
      headerName: "Date",
      width: 400,
      valueGetter: ({ row }) => formatDate(row.formatted_date),
    },
    { field: "total_parcel_count", headerName: "Scanned Parcels", width: 400 },
    {
      field: "total_amount",
      headerName: "Total Amount",
      width: 400,
      valueGetter: (params) => formatNumber(params.row.total_amount),
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      headerAlign: "left",
      renderCell: (params) => {
        // Construct the path directly using the row's ID as the counterId
        // Adjust "params.row.id" if your identifier is stored under a different key
        const pathToDetail = `/counters/main-counter-parcel/scan-detail/${params.row.id}`;

        return (
          <div className="cellAction">
            <Link to={pathToDetail} className="buttonPrimary space-x-2 h-10">
              <Icon name="details" />
              <span>Detail</span>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p>Back</p>
        </div>
        <div className="flex">
          <p className="text-2xl font-semibold">Scanned Parcel List</p>
          <p className="text-2xl font-semibold text-gray">({cityName})</p>
        </div>
        <div className="flex items-center text-base font-normal h-10">
          <p className="py-2 px-4 border-r border-gray text-gray">Counter</p>
          <p className="py-2 px-4">Counter Detail</p>
        </div>
      </div>
      <div className="w-full mt-8 flex justify-end items-center mb-6">
        <div className="w-1/3">
          <Datepicker
            value={value}
            onChange={handleValueChange}
            inputClassName="h-12 w-full placeholder:text-base outline-none border border-gray-light rounded-[10px] pl-6"
          />
        </div>
      </div>
      <Datatable rows={data} columns={columns} />
    </>
  );
};

export default MainCounterScan;
