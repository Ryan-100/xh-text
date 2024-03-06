/* eslint-disable */
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../icons";
import { permissionData } from "../../layout/config";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { admin } from "../../store/actions/admin.action";
import { Admin } from "../../store/reducers/admin.reducer";
import { cn, formatDate, safeFormatString } from "../../utils";
import { counter } from "../../store/actions/counter.action";

const AdminDetail = () => {
	const { id: adminId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [counters, setCounters] = useState([]);
	const [adminData, setAdminData] = useState<Admin>();
	const [isCopyClicked, setIsCopyClicked] = useState(false);
	const goBack = () => {
		navigate(-1);
	};
	const goToEdit = () => {
		navigate("/admin/edit/123");
	};
	const goToEditPermission = () => {
		navigate("/admin/edit/permissions/123");
	};

	useEffect(() => {
		const fetchCounters = async () => {
			try {
				const res = await dispatch(counter.getAllCounters() as any);
				setCounters(res?.data);
			} catch (error) {
				console.error("Error fetching counter:", error);
			}
		};
		const fetchAdmin = async () => {
			try {
				const res = await dispatch(admin.getAdminById(adminId) as any);
				setAdminData(res.data);
			} catch (error) {
				console.error("Error fetching counter:", error);
			}
		};
		fetchAdmin();
		fetchCounters();
	}, [dispatch, adminId]);

	const handleCopyClick = async (textToCopy: string) => {
		try {
			setIsCopyClicked(true);
			await navigator.clipboard.writeText(textToCopy);
		} catch (error) {
			console.error("Error copying text:", error);
		} finally {
			setTimeout(() => {
				setIsCopyClicked(false);
			}, 100);
		}
	};

	return (
		<>
			{adminData && counters && (
				<div className="flex flex-col space-y-6">
					<div className="flex justify-between items-center mb-[2px]">
						<div
							onClick={goBack}
							className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
						>
							<Icon name="leftArrow" />
							<p className="">Back</p>
						</div>
						<p className="text-2xl font-semibold">Admin Detail</p>
						<div className="flex items-center text-base font-normal  h-10">
							<p className="py-2 px-4 border-r border-r-gray text-gray">
								Admin List
							</p>{" "}
							<p className=" py-2 px-4">Admin Detail</p>
						</div>
					</div>
					<div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center justify-center space-x-[84px]">
								<div className="flex flex-col">
									<p className="text-gray leading-6">Joined Date</p>
									<p className="text-secondary leading-6">
										{formatDate(adminData.created_at)}
									</p>
								</div>
								<div className="flex flex-col">
									<p className="text-gray leading-6">Now</p>
									<p className="text-secondary leading-6">
										{formatDate(new Date())}
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-6">
								<div
									onClick={goToEdit}
									className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
								>
									<Icon name="edit1" width={24} height={24} />
									<p className="text-[20px] text-white">Edit Information</p>
								</div>
								<div className="editButton h-12">
									<Icon name="delete2" />
								</div>
							</div>
						</div>
						<Divider className="w-full" />
						<div className="flex space-x-6 justify-start">
							<img
								src="/profile.png"
								alt="profile"
								className="w-[252px] h-[252px]"
							/>
							<div className="flex flex-col">
								<div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
									<p className="text-gray">Admin Name</p>
									<p className="text-secondary w-[235px]">
										{safeFormatString(adminData.username)}
									</p>
								</div>
								<div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
									<p className="text-gray">Admin ID</p>
									<div className="flex items-center justify-normal space-x-2 w-[235px]">
										<p className="text-secondary">
											{safeFormatString(adminData.adminID)}
										</p>
										{adminData.adminID && (
											<span
												className={cn("cursor-pointer", {
													"opacity-50": isCopyClicked,
												})}
												onClick={() => handleCopyClick(adminData.adminID)}
											>
												<Icon name="copy" />
											</span>
										)}
									</div>
								</div>
								<div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
									<p className="text-gray">Phone</p>
									<p className="text-secondary w-[235px]">
										{safeFormatString(adminData.phone)}
									</p>
								</div>
								<div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
									<p className="text-gray">Role</p>
									<p className="text-secondary w-[235px]">
										{safeFormatString(adminData?.role?.name)}
									</p>
								</div>
								<div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
									<p className="text-gray">Branch</p>
									<p className="text-secondary w-[235px]">
										{safeFormatString(adminData.city.city_eng)}
									</p>
								</div>
								<div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
									<p className="text-gray">Counter</p>
									<p className="text-secondary w-[235px]">
										{safeFormatString(
											counters?.find(
												(counter) => counter.id === adminData.counter_id
											)?.name
										)}
									</p>
								</div>
								<div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
									<p className="text-gray">Password</p>
									<p className="text-secondary w-[235px]">
										{adminData.password}
									</p>
								</div>
								<div className="h-fit w-[411px] py-3 px-4 flex items-start justify-between ">
									<p className="text-gray">Address</p>
									<p className="text-secondary w-[235px]">
										{safeFormatString(adminData.address)}
									</p>
								</div>
								<div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1 mb-6">
									<p className="text-gray">Created By</p>
									<p className="text-secondary w-[235px]">
										{/* {safeFormatString(adminData.)} */}
										api response needed
									</p>
								</div>
							</div>
						</div>
						<Divider className="w-full" />
						<div className="w-full flex flex-col space-y-4">
							<div className="w-full flex items-center justify-between">
								<p className="text-sm md:text-base xl:text-xl">Permissions</p>
								<div
									onClick={goToEditPermission}
									className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
								>
									<Icon name="edit1" width={24} height={24} />
									<p className="text-[20px] text-white">Edit Permission</p>
								</div>
							</div>
							<div className="grid grid-cols-3 grid-rows-5 gap-2">
								{permissionData.map((data, i) => (
									<BulletList key={i}>{data}</BulletList>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminDetail;

const BulletList = styled.li`
	display: list-item;
	font-size: 16px;
	height: 24px;
	list-style-image: url("/list.svg");
	padding-inline-start: 12px;
`;
