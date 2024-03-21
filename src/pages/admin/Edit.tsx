/* eslint-disable */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../icons";
import InputField from "../../components/form/InputFiled";
import MuiTextarea from "../../components/form/TextArea";
import InputSelect from "../../components/form/InputSelect";
import { useDispatch } from "react-redux";
import { region } from "../../store/actions/region.action";
import { city } from "../../store/actions/city.action";
import { block } from "../../store/actions/block.action";
import { role } from "../../store/actions/role.action";
import { counter } from "../../store/actions/counter.action";
import { UpdateAdminData } from "../../store/actions/admin.action";
import AlertModal from "../../components/Modal/AlertModal";
import { admin } from "../../store/actions/admin.action";

const defaultValues = {
	name: "",
	phone: "",
	password: "",
	role: "",
	branch: "",
	block: "",
	region: "",
	address_detail: "",
	counter: "",
};

const AdminEdit = () => {
	const { control, handleSubmit, reset, watch } = useForm({
		mode: "onChange",
		defaultValues,
	});
	const { id: adminId } = useParams();
	const [regionOptions, setRegionOptions] = useState([]);
	const [cityOptions, setCityOptions] = useState([]);
	const [blockOptions, setBlockOptions] = useState([]);
	const [roleOptions, setRoleOptions] = useState([]);
	const [counterOptions, setCouterOptions] = useState([]);
	const [isAlert, setIsAlert] = useState(false);
	const dispatch = useDispatch();
	const [alertMsg, setAlertMsg] = useState("");
	const selectedCityId = watch("branch");
	const selectedBlockId = watch("block");

	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	const fetchRegions = async () => {
		try {
			const res = await dispatch(region.getAllRegions() as any);
			const filteredRegions = res.data.filter((region) => {
				return region?.block_id === selectedBlockId;
			});
			const _region = filteredRegions.map((region) => ({
				value: region?.id,
				label: region?.region_eng,
			}));
			setRegionOptions(_region);
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

	const fetchCities = async () => {
		try {
			const res = await dispatch(city.getAllCities() as any);
			const _city = res?.data?.map((city) => ({
				value: city?.id,
				label: city?.city_eng,
			}));
			setCityOptions(_city);
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

	const fetchBlocks = async () => {
		try {
			const res = await dispatch(block.getAllblocks() as any);
			const filteredBlocks = res.data.filter((block) => {
				return block?.city_id === selectedCityId;
			});
			const _block = filteredBlocks?.map((block) => ({
				value: block?.id,
				label: block?.block_eng,
			}));
			setBlockOptions(_block);
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

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
			const filteredCounters = res.data.filter((counter) => {
				return counter?.city_id === selectedCityId;
			});
			const _counters = filteredCounters.map((counter) => ({
				value: counter?.id,
				label: counter?.name,
			}));
			setCouterOptions(_counters);
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

	const fetchAdmin = async () => {
		try {
			const { data } = await dispatch(admin.getAdminById(adminId) as any);
			reset({
				name: data.username,
				phone: data.phone,
				role: data.role_id,
				branch: data.city_id,
				block: data.address_block_id,
				region: data.address_region_id,
				address_detail: data.address,
				counter: data.counter_id,
			});
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

	useEffect(() => {
		fetchCities();
		fetchRoles();
	}, []);

	useEffect(() => {
		fetchRegions();
	}, [selectedBlockId]);

	useEffect(() => {
		fetchBlocks();
		fetchCounters();
	}, [selectedCityId]);

	useEffect(() => {
		if (adminId) {
			fetchAdmin();
		}
	}, [adminId]);

	const onSubmit = async (data) => {
		try {
			if (!adminId) return;
			const isAnyFieldUndefined = Object.values(data).some(
				(value) => value === undefined
			);
			if (isAnyFieldUndefined) {
				setAlertMsg("Kindly fill all fields with the necessary information.");
				setIsAlert(true);
				return;
			}
			const reqData: UpdateAdminData = {
				phone: data.phone,
				username: data.name,
				role_id: data.role,
				city_id: data.branch,
				address_city_id: data.branch,
				address_block_id: data.block,
				address_region_id: data.region,
				address: data.address_detail,
				counter_id: data.counter,
				active: 1,
			};
			if (data.password) {
				reqData.password = data.password;
			}
			const res = await dispatch(admin.updateAdmin(reqData, adminId) as any);
			setAlertMsg(res.message);
			setIsAlert(true);
			reset(defaultValues);
			navigate("/admin");
		} catch (error) {
			setAlertMsg(error);
			setIsAlert(true);
		}
	};

	return (
		<div className="flex flex-col space-y-6">
			<div className="flex justify-between items-center mb-[2px]">
				<div
					onClick={goBack}
					className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
				>
					<Icon name="leftArrow" />
					<p className="">Back</p>
				</div>
				<p className="title">
					Edit Admin{" "}
					<span className="text-gray">(Admin ID : SuperAdmin_HHW)</span>
				</p>
				<div className="side-title  h-10">
					<p className="py-2 px-4 border-r border-r-gray text-gray">
						Admin Detail
					</p>{" "}
					<p className="py-2 px-4">Edit Admin</p>
				</div>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-6"
			>
				<div className="bg-white rounded-t-[10px] flex flex-col items-start p-6 space-y-6">
					<div className="flex space-x-6 justify-center items-center">
						<img
							src="/profile.png"
							alt="profile"
							className="w-[252px] h-[252px]"
						/>
						<div className="w-[252px] space-y-4">
							<div className="self-start rounded-[10px] w-[252px] bg-primary py-3 px-[46px] flex items-center space-x-2 text-white">
								<Icon name="edit1" width={24} height={24} />
								<p className="text-sm md:text-base xl:text-xl text-white">
									Change Photo
								</p>
							</div>
							<p className="text-bbase text-gray leading-6">
								Acceptable formats : jpg, png only Max file size : 500 KB
							</p>
						</div>
					</div>
					<div className="flex flex-col space-y-4">
						<p className="text-2xl font-medium">Change Information</p>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">Name</p>
							<div className="w-[528px]">
								<InputField name="name" control={control} label={""} />
							</div>
						</div>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">Phone</p>
							<div className="w-[528px]">
								<InputField
									name="phone"
									type="number"
									control={control}
									label={""}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">Role</p>
							<div className="w-[528px]">
								<InputSelect
									fullWidth
									name="role"
									control={control}
									label={""}
									options={roleOptions}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">
								Branch
							</p>
							<div className="w-[528px]">
								<InputSelect
									fullWidth
									name="branch"
									control={control}
									label={"Select Branch"}
									options={cityOptions}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">
								Counter
							</p>
							<div className="w-[528px]">
								<InputSelect
									fullWidth
									name="counter"
									control={control}
									label={"Select Counter"}
									options={counterOptions}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-transparent flex flex-col items-start p-6 space-y-6">
					<div className="flex flex-col space-y-4">
						<p className="text-2xl font-medium">Fill Password</p>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">
								Password
							</p>
							<div className="w-[528px]">
								<InputField
									name="password"
									password
									placeholder="Enter Current Password"
									control={control}
									label={""}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-b-[10px] flex flex-col items-start p-6 space-y-6">
					<div className="flex flex-col space-y-4">
						<p className="text-2xl font-medium">Fill Address</p>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">Block</p>
							<div className="w-[528px]">
								<InputSelect
									fullWidth
									name="block"
									control={control}
									label={"Select Block"}
									options={blockOptions}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">
								Region Type
							</p>
							<div className="w-[528px]">
								<InputSelect
									fullWidth
									name="region"
									control={control}
									label={"Select Region Type"}
									options={regionOptions}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between w-[780px]">
							<p className="text-sm md:text-base xl:text-xl text-gray">
								Address Detail
							</p>
							<div className="w-[528px]">
								<MuiTextarea
									name="address_detail"
									control={control}
									placeholder="Enter New Address"
									rows={2.5}
									label={""}
								/>
							</div>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 "
				>
					<Icon name="save" width={16} height={16} />
					<p className="btn-lg">Save Updates</p>
				</button>
			</form>
			<AlertModal
				title="Alert"
				body={alertMsg}
				open={isAlert}
				onClose={() => setIsAlert(false)}
			/>
		</div>
	);
};

export default AdminEdit;
