import React, { useEffect, useRef, useState } from "react";
import client from "../../controller/constant/HttpClient";
import Icon from "../../icons";
import Datatable from "../../components/table/datatable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"; // Import GridRenderCellParams
import TableComponent from "../../components/table/table";
import { TableCell, TableRow } from "@mui/material";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { counter } from "../../store/actions";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const MainCounterDetailScan = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [formattedDate, setFormattedDate] = useState("");
  const [totalRowCount, setTotalRowCount] = useState(0);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [counterId, setCounterId] = useState(null);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setCounterId(searchParams.get("counter_id"));
    const fromDate = searchParams.get("from_date");
    if (fromDate) {
      const formatted = moment.utc(fromDate).format("DD MMM YYYY");
      setFormattedDate(formatted);
      setSelectedDate(moment(fromDate).toDate());
    }
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fromDate = searchParams.get("from_date");
    if (fromDate) {
      setFormattedDate(moment(fromDate).format("DD MMM YYYY"));
    }

    const apiUrl = `counter/main-counter/parcel/detail`;

    let from_date = searchParams.get("from_date");
    let to_date = searchParams.get("to_date");

    if (selectedDate) {
      setFormattedDate(moment(selectedDate).format("DD MMM YYYY"));

      const dateInUTC = moment(selectedDate).add(
        moment(selectedDate).utcOffset(),
        "minutes"
      );
      from_date = dateInUTC
        .startOf(selectedDate)
        .startOf("day")
        .format("YYYY-MM-DD[T00:00:00Z]");
      to_date = dateInUTC
        .startOf(selectedDate)
        .endOf("day")
        .format("YYYY-MM-DD[T23:59:59Z]");
    }

    const fetchData = async () => {
      if (!counterId) return;

      try {
        const response = await client.get(apiUrl, {
          params: {
            counter_id: counterId,
            from_date: from_date,

            to_date: to_date,
            skip: searchParams.get("skip"),
            take: searchParams.get("take"),
            parcel_type: searchParams.get("parcel_type"),
          },
        });

        const mappedData = response.data.data.data.map((item, index) => ({
          id: item.id,
          no: index + 1,
          barcode: item.parcel.barcode,
          parcelType:
            item.parcel?.delivery_fees?.parcel_type?.parcel_type || "N/A",
          weight: item.parcel.weight + " KG",
          amount: item.parcel.delivery_fee + " Ks",
        }));

        setData(mappedData); // Adjust based on your API's response structure
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [counterId, selectedDate, location.search]);

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

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 150 },

    {
      field: "barcode",
      headerName: "Barcode",
      width: 350,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Icon name="barcode" color="#FF6604" />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "parcelType", headerName: "Parcel Type", width: 350 },
    {
      field: "weight",
      headerName: "Weight",
      width: 350,
      renderCell: (params: GridRenderCellParams) => (
        <span>{`${params.value} `}</span>
      ),
    },
    {
      field: "amount",
      headerName: "Item Qty/Amount",
      width: 350,
      renderCell: (params: GridRenderCellParams) => (
        <span>{`1/${params.value} `}</span>
      ),
    },
  ];

  const tableBodyData = (
    <>
      <TableRow>
        <TableCell align="center">Scanned Parcels </TableCell>
        <TableCell align="center">{totalRowCount}</TableCell>
      </TableRow>
    </>
  );
  const goBack = () => navigate(-1);

  return (
    <div>
         <style>
        {`
          .react-datepicker-wrapper,
          .react-datepicker__input-container,
          .react-datepicker__input-container input {
              border: 1px solid #ECEDEF; /* Example for Tailwind blue-500 */
              border-radius: 0.375rem; /* Tailwind rounded-md */
          }
          
          .react-datepicker__input-container input::placeholder {
              font-size: 4rem; /* Example for Tailwind text-sm */
              text-align: center; /* Center text */
          }

          .react-datepicker__input-container input {
              padding: 0.25rem 0.5rem; /* Tailwind py-1 px-2 */
          }
        `}
      </style>
      <div className="flex justify-between items-center mb-2">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p>Back</p>
        </div>
        <div className="flex">
          <p className="text-2xl font-semibold">Parcel List Detail</p>
          <p className="text-2xl font-semibold text-gray">({cityName})</p>
        </div>
        <div className="flex items-center text-base font-normal h-10">
          <p className="py-2 px-4 border-r border-gray text-gray">Counter</p>
          <p className="py-2 px-4">Parcel List</p>
        </div>
      </div>
      <div className="flex justify-end py-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          placeholderText={formattedDate || "Select a date"}
        />
      </div>

      <TableComponent
        colSpan={2}
        header={`Date - ${formattedDate}`}
        data={tableBodyData}
      />
      <div className="mt-12">
        {" "}
        <Datatable apiRef={apiRef} rows={data} columns={amountColumns} />
      </div>
    </div>
  );
};

export default MainCounterDetailScan;
