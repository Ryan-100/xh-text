import React, { useEffect, useRef, useState } from "react";
import client from "../../controller/constant/HttpClient";
import Icon from "../../icons";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Datatable from "../../components/table/datatable";
import { useDispatch } from "react-redux";
import { counter } from "../../store/actions";

const OtherCounterRider = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const apiRef = useRef(null);
  const [counterId, setCounterId] = useState(null);
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const counterId = searchParams.get("counter_id");
  
    const skip = searchParams.get("skip");
    const take = searchParams.get("take");

    const apiUrl = `counter/other-counter/rider`;

    const fetchData = async () => {
      try {
        const response = await client.get(apiUrl, {
          params: {
            counter_id: counterId,
            skip,
            take,
          },
        });
        const mappedData = response.data.data.data.map((item, index) => ({
          id: index + 1,
          riderName: item.full_name,
          riderID: item.riderID,
          phoneNo: item.phone,
          deliveredParcels: item.rider_package_actions?.length ?? 0,
          profileImageUrl: item.profile_image_url,
        }));
        console.log(response, "rider");

        setData(mappedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [location.search]);

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
          const res = await dispatch(counter.getOtherCounterById(counterId) as any);
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
    { field: "no", headerName: "No.", width: 70 },
    {
      field: "riderName",
      headerName: "Rider",
      width: 300,
      editable: true,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.row.profileImageUrl}
            alt="Rider"
            style={{
              width: 35,
              height: 35,
              borderRadius: "50%",
              marginRight: 10,
            }}
          />
          {params.value}
        </div>
      ),
    },
    {
      field: "riderID",
      headerName: "Rider ID",
      width: 300,
      editable: true,
    },
    {
      field: "phoneNo",
      headerName: "Phone No",
      width: 300,
    },
    {
      field: "deliveredParcels",
      headerName: "Delivered Parcels",
      width: 300,
    },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 245,
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"" + params.row.id}
              className="buttonPrimary space-x-2 h-10"
            >
              <Icon name="details" />
              <span>Detail</span>
            </Link>
          </div>
        );
      },
    },
  ];

  const goBack = () => navigate(-1);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p>Back</p>
        </div>
        <div className="flex">
          <p className="text-2xl font-semibold">Rider List</p>
          <p className="text-2xl font-semibold text-gray">({cityName})</p>

        </div>
        <div className="flex items-center text-base font-normal h-10">
          <p className="py-2 px-4 border-r border-gray text-gray">Counter Detail</p>
          <p className="py-2 px-4">Rider List</p>
        </div>
      </div>
      <Datatable
        rows={data}
        columns={amountColumns.concat(actionColumn)}
        apiRef={apiRef}
      />{" "}
    </div>
  );
};

export default OtherCounterRider;
