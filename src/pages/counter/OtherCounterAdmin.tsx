import React, { useEffect, useRef, useState } from "react";
import client from "../../controller/constant/HttpClient";
import Icon from "../../icons";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Datatable from "../../components/table/datatable";
import { useDispatch } from "react-redux";
import { admin } from "../../store/actions/admin.action";
import { counter } from "../../store/actions";


interface Admin {
  id: string;
  username: string;
  adminID?: string;
  // Add other properties here
}
const OtherCounterAdmin = () => {
  const [adminData, setAdminData] = useState<Admin[]>([]); // Use the Admin type for state
  const navigate = useNavigate();
  const apiRef = useRef(null);
  const [counterId, setCounterId] = useState(null);
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState("");

  

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
          console.log(res);
          if (res?.data) {
            setCityName(res.data?.city?.city_eng);
          }
        } catch (error) {
          console.error("Error fetching counter:", error);
        }
      }
    };
    fetchParcel();
  }, [dispatch, counterId]);

  useEffect(() => {
    const AdminData= async () => {
      if (counterId) {
        try {
          const res = await dispatch(admin.getAdminById(counterId) as any);
          console.log(res,"otherCounterAdmin")
          setAdminData(res?.data)
        } catch (error) {
          console.error("Error fetching counter:", error);
        }
      }
    };
    AdminData();
  }, [dispatch, counterId]);

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 70 },
    {
      field: "username",
      headerName: "Admin",
      width: 300,
      editable: true,
   
      
    },
    {
      field: "adminID",
      headerName: "Admin ID",
      width: 300,
      editable: true,
    },
    {
      field: "role", 
      headerName: "Role",
      width: 300,
      valueGetter: (params) => params.row.role.name, 
    },
  ];

  const actionColumn: GridColDef[] = [
		{
			field: "action",
			headerName: "Action",
			width: 245,
			headerAlign: "center",
			renderCell: (params: { row: Admin }) => {
				return (
					<div className="cellAction">
						<Link to={params.row.id} className="buttonPrimary space-x-2 h-10">
							<Icon name="details" />
							<span>Detail</span>
						</Link>
						<Link to={"/admin/edit/" + params.row.id} className="editButton">
							<Icon name="edit" color="#444240" fillColor="#444240" />
						</Link>
						<div
							className="editButton"
						
						>
							<Icon name="delete" color="#444240" fillColor="#444240" />
						</div>
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
          <p className="text-2xl font-semibold">Admin List</p>
          <p className="text-2xl font-semibold text-gray">({cityName})</p>
        </div>
        <div className="flex items-center text-base font-normal h-10">
          <p className="py-2 px-4 border-r border-gray text-gray">
            Counter Detail
          </p>
          <p className="py-2 px-4">Admin List</p>
        </div>
      </div>
      <Datatable
        rows={adminData}
        columns={amountColumns.concat(actionColumn)}
        apiRef={apiRef}
      />{" "}
    </div>
  );
};

export default OtherCounterAdmin;
