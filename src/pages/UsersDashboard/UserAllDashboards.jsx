import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackYellow from "../../assets/svg/ArrowBackYellow.webp";
import More from "../../assets/svg/More.webp";
import Send from "../../assets/svg/Send.webp";
import axios from "../../components/Hooks/axios";
import Loading from "../../components/Loading/Loading";
import { setOpenedDashboard, setUserMainDashboard } from "../../redux/slice/dashboardSlice";
import AddWidgetPopup from "./AddWidgetPopup";
import DashboardTitlePopup from "./DashboardTitlePopup";
import styles from "./UserAllDashboards.module.scss";
import UserProfilePopup from "./UserProfilePopup";

const UserAllDashboards = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userDashboards } = useSelector((state) => state.dashboard);
	const [openMenuIndex, setOpenMenuIndex] = useState(null);
	const handleOpenMenu = (index) => {
		index === openMenuIndex ? setOpenMenuIndex(null) : setOpenMenuIndex(index);
	};

	//add new dashboard
	const [openTitlePopup, setOpenTitlePopup] = useState(false);
	const [title, setTitle] = useState("");
	const [openAddWidgetPopup, setOpenAddWidgetPopup] = useState(false);

	//open user profile
	const [openUserProfile, setOpenUserProfile] = useState(false);
	const { user } = useSelector((state) => state.user);

	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [openMenu, setOpenMenu] = useState(false);
	const [reload, setReload] = useState(0);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`/main-dashboard?userId=${userDashboards?.createdBy?._id}`)
			.then(({ data }) => {
				setDashboardData(data?.data);
				dispatch(setUserMainDashboard(data?.data));
			})
			.catch((err) => {
				toast.error(err?.response?.data?.message || "Error getting layout..");
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<div>
			{openUserProfile && <UserProfilePopup {...{ setOpenUserProfile }} />}
			{openTitlePopup && <DashboardTitlePopup {...{ setOpenTitlePopup, setOpenAddWidgetPopup, title, setTitle }} />}
			{openAddWidgetPopup && <AddWidgetPopup {...{ setOpenAddWidgetPopup, title, setTitle, setReload }} />}

			<div className={styles.UserAllDashboards}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Users All Dashboards </h2>
						<p>Hello , 👋{user?.name} Welcome to Dashboard</p>
					</div>
					<div className={styles.Right}>
						<div className={styles.Back} onClick={() => navigate("/admin/users-dashboard")}>
							<img src={ArrowBackYellow} alt="" />
							<p>Back</p>
						</div>
					</div>
				</div>
				<div className={styles.Dashboards}>
					<div className={styles.MainDashboard}>
						<h2>Main Dashboard</h2>
						{loading ? (
							<Loading color="#d4bf3e" />
						) : (
							!dashboardData && (
								<div className={styles.NotCreated}>
									<h2>User not created a Dashboard Yet</h2>
								</div>
							)
						)}
						{dashboardData && (
							<div className={styles.DashboardCard}>
								<div className={styles.Top}>
									<div className={styles.Profile}>
										<img src={dashboardData?.createdBy?.profilePic} alt="" />
										<div className={styles.Details}>
											<h3>{dashboardData?.createdBy?.name}</h3>
											<p>{dashboardData?.createdBy?.email || " "}</p>
										</div>
									</div>
									<div className={styles.Buttons}>
										<span className={styles.Menu} onClick={() => setOpenMenu(!openMenu)}>
											<img src={More} alt="" />
											<div className={`${styles.SubMenu} ${openMenu ? styles.Open : ""}`} onClick={(e) => e.stopPropagation()}>
												<p
													onClick={() =>
														navigate("/admin/manage-user-dashboard", {
															state: { activeDashboard: dashboardData },
														})
													}>
													<FiEdit />
													Edit User Dashboard
												</p>
											</div>
										</span>
										<span>
											<img src={Send} alt="" />
										</span>
									</div>
								</div>
								<div className={styles.Image}>
									<img
										src={
											"https://firebasestorage.googleapis.com/v0/b/file-upload-demo-213de.appspot.com/o/Pilar9%2FDashboardDemo.png?alt=media&token=842d2a46-7d24-4ddb-9b9b-0623a0814fd9"
										}
										alt=" "
										height={"100%"}
										width={"100%"}
										title=" "
										loading="lazy"
									/>
								</div>
							</div>
						)}
					</div>
					<div className={styles.MultiDashboards}>
						<div className={styles.Row}>
							<h2>Multi Dashboards</h2>
							<button onClick={() => setOpenTitlePopup(true)}>Create new Dashboard</button>
						</div>
						<div className={styles.Cards}>
							{userDashboards?.dashboards?.map((item, i) => (
								<div key={i} className={styles.DashboardCard}>
									<div className={styles.Top}>
										<div className={styles.Profile}>
											<img
												src={userDashboards?.createdBy?.profilePic}
												alt=" "
												height={"100%"}
												width={"100%"}
												title=" "
												loading="lazy"
											/>
											<div className={styles.Details}>
												<h3>{item?.title}</h3>
												<p>@{userDashboards?.createdBy?.name || ""}</p>
											</div>
										</div>
										<div className={styles.Buttons}>
											<span className={styles.Menu} onClick={() => handleOpenMenu(i)}>
												<img src={More} alt="" />
												<div
													className={`${styles.SubMenu} ${i === openMenuIndex ? styles.Open : ""}`}
													onClick={(e) => e.stopPropagation()}>
													<p
														onClick={() => {
															navigate("/admin/manage-user");
															dispatch(setOpenedDashboard(item));
														}}>
														<FiEdit />
														Edit User Dashboard
													</p>
												</div>
											</span>
											<span>
												<img src={Send} alt="" />
											</span>
										</div>
									</div>
									<div className={styles.Image}>
										<img
											src={
												"https://firebasestorage.googleapis.com/v0/b/file-upload-demo-213de.appspot.com/o/Pilar9%2FDashboardDemo.png?alt=media&token=842d2a46-7d24-4ddb-9b9b-0623a0814fd9"
											}
											alt=" "
											height={"100%"}
											width={"100%"}
											title=" "
											loading="lazy"
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAllDashboards;
