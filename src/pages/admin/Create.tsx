/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
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

const ProfileEditComponent = () => {
	const { control } = useForm({ mode: "onChange" });
	const [regionOptions, setRegionOptions] = useState([]);
	const [cityOptions, setCityOptions] = useState([]);
	const [blockOptions, setBlockOptions] = useState([]);
	const [roleOptions, setRoleOptions] = useState([]);
	const [counterOptions, setCouterOptions] = useState([]);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	const fetchRegions = async () => {
		try {
			const res = await dispatch(region.getAllRegions() as any);
			const _region = res?.data?.map((region) => ({
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
			const res = await dispatch(city.getAllcities() as any);
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
			const _block = res?.data?.map((block) => ({
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
			const _counters = res?.data?.map((counter) => ({
				value: counter?.id,
				label: counter?.name,
			}));
			setCouterOptions(_counters);
		} catch (error) {
			console.error("Error fetching counter:", error);
		}
	};

	useEffect(() => {
		fetchRegions();
		fetchCities();
		fetchBlocks();
		fetchRoles();
		fetchCounters();
	}, []);

	// console.log(cityOptions);
	// console.log(regionOptions);
	// console.log(blockOptions);
	// console.log(roleOptions);
	// console.log(counterOptions);

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
				<p className="text-2xl font-semibold">
					Edit Admin{" "}
					<span className="text-gray">(Admin ID : SuperAdmin_HHW)</span>
				</p>
				<div className="flex items-center text-base font-normal  h-10">
					<p className="py-2 px-4 border-r border-r-gray text-gray">
						Admin Detail
					</p>{" "}
					<p className="py-2 px-4">Edit Admin</p>
				</div>
			</div>
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
							<InputField
								name="name"
								control={control}
								label={""}
								value={"Hsu Hnin Wai"}
							/>
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
								value={9976666666}
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
						<p className="text-sm md:text-base xl:text-xl text-gray">Branch</p>
						<div className="w-[528px]">
							<InputSelect
								fullWidth
								name="branch"
								control={control}
								label={""}
								options={counterOptions}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between w-[780px]">
						<p className="text-sm md:text-base xl:text-xl text-gray">Counter</p>
						<div className="w-[528px]">
							<InputSelect
								fullWidth
								name="counter"
								control={control}
								label={""}
								options={counterOptions}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-transparent flex flex-col items-start p-6 space-y-6">
				<div className="flex flex-col space-y-4">
					<p className="text-2xl font-medium">Change Password</p>
					<div className="flex items-center justify-between w-[780px]">
						<p className="text-sm md:text-base xl:text-xl text-gray">
							Current Password
						</p>
						<div className="w-[528px]">
							<InputField
								name="current_password"
								password
								placeholder="Enter Current Password"
								control={control}
								label={""}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between w-[780px]">
						<p className="text-sm md:text-base xl:text-xl text-gray">
							New Password
						</p>
						<div className="w-[528px]">
							<InputField
								name="new_password"
								password
								placeholder="Enter New Password"
								control={control}
								label={""}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between w-[780px]">
						<p className="text-sm md:text-base xl:text-xl text-gray">
							Confirm Password
						</p>
						<div className="w-[528px]">
							<InputField
								name="confirm_password"
								password
								placeholder="Confirm New Password"
								control={control}
								label={""}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-b-[10px] flex flex-col items-start p-6 space-y-6">
				<div className="flex flex-col space-y-4">
					<p className="text-2xl font-medium">Change Address</p>
					<div className="flex items-center justify-between w-[780px]">
						<p className="text-sm md:text-base xl:text-xl text-gray">
							Current Address
						</p>
						<div className="w-[528px]">
							<MuiTextarea
								name="current_address"
								control={control}
								placeholder="Enter Current Address"
								rows={3.5}
								label={""}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between w-[780px]">
						<p className="text-sm md:text-base xl:text-xl text-gray">City</p>
						<div className="w-[528px]">
							<InputSelect
								fullWidth
								name="city"
								control={control}
								label={""}
								options={counterOptions}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between w-[780px]">
						<p className="text-sm md:text-base xl:text-xl text-gray">Block</p>
						<div className="w-[528px]">
							<InputSelect
								fullWidth
								name="block"
								control={control}
								label={""}
								options={counterOptions}
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
								label={""}
								options={counterOptions}
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
			<div className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
				<Icon name="save" width={16} height={16} />
				<p className="text-[20px] text-white">Save Updates</p>
			</div>
		</div>
	);
};

export default ProfileEditComponent;
