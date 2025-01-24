import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../components/Hooks/axios";
import { formatTimestamp } from "../../components/utils/HelperFunctions";
import { setUserDashboards } from "../../redux/slice/dashboardSlice";
import { setOpenLoadingPopup } from "../../redux/slice/tempSlice";
import styles from "./UsersDashboard.module.scss";

const UsersDashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [userCount, setUserCount] = useState(0);

	//get users dashboards

	const [dashboards, setDashboards] = useState([]);
	useEffect(() => {
		dispatch(setOpenLoadingPopup(true));
		axios
			.get(`dashboard?page=${page}&limit=${limit}`)
			.then(({ data }) => {
				setDashboards(data?.data);
				setUserCount(data?.totalUsers);
			})
			.catch((err) => {
				toast.error(err?.response?.data?.message || "error loading dashboard Data..");
			})
			.finally(() => dispatch(setOpenLoadingPopup(false)));
	}, [page, limit]);

	return (
		<div className={styles.UsersDashboard}>
			<div className={styles.DashboardTable}>
				<div className={styles.Filters}>
					<div className={styles.SearchWrapper}>
						<BiSearch />
						<input type="search" name="" id="" placeholder="Search for User" />
					</div>
				</div>
				<div className={styles.Headings}>
					<div>User Name</div>
					<div>Email</div>
					<div>Joining Date</div>
					<div>No. of Dashboards</div>
					<div>View</div>
				</div>
				<div className={styles.SupportCards}>
					{dashboards?.map((data, i) => {
						return (
							<div className={styles.Card} key={i}>
								<div className={styles.NamePic}>
									<img src={data?.createdBy?.profilePic} alt=" " height={"100%"} width={"100%"} loading="lazy" title=" " />
									{data?.createdBy?.name}
								</div>
								<div>{data?.createdBy?.email}</div>
								<div>{formatTimestamp(data?.createdBy?.createdAt)}</div>
								<div>{data?.dashboards?.length}</div>
								<div>
									<BsEyeFill
										onClick={() => {
											navigate(`/admin/user-all-dashboards`);
											dispatch(setUserDashboards(data));
										}}
									/>
								</div>
							</div>
						);
					})}
				</div>
				<div className={styles.SupportFooter}>
					<p>{`Showing ${dashboards?.length} of ${userCount} records in page ${page} `}</p>
					<div className={styles.pageButtons}>
						<button
							className={styles.leftArrow}
							disabled={page === 1}
							onClick={() => {
								setPage(page - 1);
							}}
						>
							{<FaArrowLeft />}
						</button>

						<p>{page}</p>

						<button
							disabled={page === Math.ceil(userCount / limit) || Math.ceil(userCount / limit) < 2}
							onClick={() => {
								setPage(page + 1);
							}}
						>
							{<FaArrowRight />}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersDashboard;
