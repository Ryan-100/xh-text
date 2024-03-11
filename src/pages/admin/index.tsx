/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import Datatable from "../../components/table/datatable";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import InputSelect from "../../components/form/InputSelect";
import { useForm } from "react-hook-form";
import Icon from "../../icons";
import { useDispatch } from "react-redux";
import { admin } from "../../store/actions/admin.action";
import { Admin } from "../../store/reducers/admin.reducer";
import { counter } from "../../store/actions/counter.action";
import { role } from "../../store/actions/role.action";
import { safeFormatString } from "../../utils";
import ModalComponent from "../../components/Modal";
import AlertModal from "../../components/Modal/AlertModal";

const AdminList = () => {
	const [data, setData] = useState<Admin[]>([]);
	const [roleOptions, setRoleOptions] = useState([]);
	const [counterOptions, setCouterOptions] = useState([]);
	const [counters, setCounters] = useState([]);
	const [editRowId, setEditRowId] = useState(null);
	const apiRef = useRef(null);
	const dispatch = useDispatch();
	const [roleId, setRoleId] = useState("");
	const [counterId, setCounterId] = useState("");
	const [isAlert, setIsAlert] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [isDelete, setIsDelete] = useState(false);
	const [selectedAdminId, setSelectedAdminId] = useState("");

	const { control } = useForm({ mode: "onChange" });

	const fetchRoles = async () => {
		try {
			const res = await dispatch(role.getAllRoles() as any);
			const _roles = res?.data?.map((role) => ({
				value: role?.id,
				label: role?.name,
			}));
			setRoleOptions(_roles);
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

	const fetchCounters = async () => {
		try {
			const res = await dispatch(counter.getAllCounters() as any);
			const _counters = res?.data?.map((counter) => ({
				value: counter?.id,
				label: counter?.name,
			}));
			setCouterOptions(_counters);
			setCounters(res?.data);
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

	const fetchAdmins = async (roleId: string, counterId: string) => {
		try {
			const res = await dispatch(admin.getAllAdmins(roleId, counterId) as any);
			setData(res?.data as Admin[]);
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

	useEffect(() => {
		fetchAdmins(roleId, counterId);
		fetchCounters();
		fetchRoles();
	}, [roleId, counterId]);

	const handleDelete = async () => {
		// setData(data.filter((item) => item.id !== id));
		try {
			const res = await dispatch(admin.deleteAdmin(selectedAdminId) as any);
			fetchAdmins(roleId, counterId);
			setIsDelete(false);
			setAlertMsg(res.message);
			setIsAlert(true);
		} catch (error) {
			setAlertMsg(error);
			setIsAlert(true);
		}
	};

	const handleEdit = (id) => {
		setEditRowId(id);
	};

	const handleSave = () => {
		setEditRowId(null);
		// Add logic to save the edited data (e.g., make an API call)
	};

	const handleProcessRowUpdate = (updatedRow, originalRow) => {
		console.log(updatedRow, originalRow, "rows");
		handleSave();
		return updatedRow;
	};
	const userColumns: GridColDef[] = [
		{
			field: "no",
			headerName: "No.",
			width: 78,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "user",
			headerName: "Admin",
			width: 195,
			renderCell: (params) => {
				return (
					<>
						<div className="cellWithImg">
							{/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
							<p className="MuiDataGrid-cellContent">{params.row.username}</p>
						</div>
					</>
				);
			},
		},
		{
			field: "adminID",
			headerName: "Admin ID",
			width: 167,

			renderCell: (params: { row: Admin }) => {
				return <p className="">{safeFormatString(params?.row?.adminID)}</p>;
			},
		},
		{
			field: "role",
			headerName: "Role",
			width: 190,
			renderCell: (params) => {
				return <p className="">{params?.row?.role?.name}</p>;
			},
		},
		{
			field: "counter",
			headerName: "Counter",
			width: 200,
			renderCell: (params: { row: Admin }) => {
				if (!params?.row?.counter_id) {
					return <p className="">no data</p>;
				}

				const counter_name = counters?.find(
					(counter) => counter.id === params?.row?.counter_id
				)?.name;

				return <p className="">{counter_name}</p>;
			},
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
							onClick={() => {
								setSelectedAdminId(params.row.id);
								setIsDelete(true);
							}}
						>
							<Icon name="delete" color="#444240" fillColor="#444240" />
						</div>
					</div>
				);
			},
		},
	];

	return (
		<>
			{data && (
				<div className="">
					<div className="pb-6 w-full flex flex-col justify-center items-end md:flex-row md:items-center md:justify-between">
						<div className="flex items-center space-x-6">
							<div className="">
								<p className="text-xs md:text-sm xl:text-base leading-6">
									Filter By Role
								</p>
								<div className="w-[344px]">
									<InputSelect
										name="role"
										control={control}
										options={roleOptions}
										fullWidth
										label={"Choose Admin Role"}
										onChange={(selectedValue) => {
											setRoleId(selectedValue);
										}}
									/>
								</div>
							</div>
							<div className="">
								<p className="text-xs md:text-sm xl:text-base leading-6">
									Filter By Counter Name
								</p>
								<div className="w-[344px]">
									<InputSelect
										name="counter"
										control={control}
										options={counterOptions}
										fullWidth
										label={"Choose Counter Name"}
										onChange={(selectedValue) => {
											setCounterId(selectedValue);
										}}
									/>
								</div>
							</div>
						</div>
						<Link to="create">
							<div className="buttonPrimary space-x-2 h-12">
								<Icon name="add" />
								<span className="text-sm md:text-base xl:text-xl">
									{" "}
									Create Admin
								</span>
							</div>
						</Link>
					</div>
					<Datatable
						rows={data}
						columns={userColumns.concat(actionColumn)}
						apiRef={apiRef}
						editRowId={editRowId}
						updateRow={handleProcessRowUpdate}
					/>
					<ModalComponent
						title="Confirm"
						body={"Are you sure to delete this Admin? Please confirm it."}
						open={isDelete}
						onClose={() => setIsDelete(false)}
						onConfirm={handleDelete}
					/>
					<AlertModal
						title="Alert"
						body={alertMsg}
						open={isAlert}
						onClose={() => setIsAlert(false)}
					/>
				</div>
			)}
		</>
	);
};

export default AdminList;
