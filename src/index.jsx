import React, { lazy, Suspense, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./assets/scss/Styles.module.scss";
import "./assets/scss/index.scss";
import ls from "localstorage-slim";
import { Provider, useSelector } from "react-redux";
import ScrollToTop from "./components/Hooks/ScrollToTop";
import LoadingPopup from "./components/Loading/LoadingPopup";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/Topbar/TopBar";
import Dashboard from "./pages/Dashboard/Dashboard";

import axios from "./components/Hooks/axios";
import DataTable from "./pages/DataTable/DataTable";
import FullScreenPopup from "./pages/ManageWidgets/FullScreenPopup";
import ManageUserDashboard from "./pages/UsersDashboard/ManageUserDashboard";
import store from "./redux/store";

const UsersDashboard = lazy(() => import("./pages/UsersDashboard/UsersDashboard"));
const ManageWidgets = lazy(() => import("./pages/ManageWidgets/ManageWidgets"));
const WidgetRequests = lazy(() => import("./pages/ManageWidgets/WidgetRequests"));
const ManageUser = lazy(() => import("./pages/UsersDashboard/ManageUser"));
const UserAllDashboards = lazy(() => import("./pages/UsersDashboard/UserAllDashboards"));

const Admin = ({ token, adminData, X_API_KEY, API_BASE_URL }) => {
	useEffect(() => {
		if (!token) {
			toast.warn("Token is Required...");
			return;
		}
		ls.set("Pilar9_Admin_Token", token);
		ls.set("superAdmin_data", adminData);
		ls.set("X_API_KEY", X_API_KEY);
		ls.set("API_BASE_URL", API_BASE_URL);
		axios.defaults.headers.Authorization = token;
	}, [token, adminData, ls.get("Pilar9_Admin_Token")]);

	if (ls.get("Pilar9_Admin_Token"))
		return (
			<>
				<Provider store={store}>
					<ScrollToTop />
					<ToastContainer
						position="top-center"
						autoClose={3000}
						limit={4}
						hideProgressBar={false}
						newestOnTop={false}
						rtl={false}
						pauseOnFocusLoss={false}
						draggable={false}
						pauseOnHover
					/>

					<Routes>
						<Route path="/" element={<Navigate to="/admin/dashboard" />} />
						<Route path="/admin" element={<Wrapper />}>
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="users-dashboard" element={<UsersDashboard />} />
							<Route path="user-all-dashboards" element={<UserAllDashboards />} />
							<Route path="widget-requests" element={<WidgetRequests />} />
							<Route path="manage-user-widgets" element={<ManageWidgets />} />
							<Route path="manage-user" element={<ManageUser />} />
							<Route path="manage-user-dashboard" element={<ManageUserDashboard />} />
							<Route path="data-table" element={<DataTable />} />
						</Route>
					</Routes>
				</Provider>
			</>
		);
};

export default Admin;

const Wrapper = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!ls.get("Pilar9_Admin_Token")) navigate("/");
	}, []);

	const { pathname } = useLocation();
	const { openLoadingPopup } = useSelector((state) => state.temp);
	const { openWidgetInFullScreen } = useSelector((state) => state.widget);
	return (
		<div className={styles.Wrapper}>
			<Suspense fallback={<LoadingIndicator />}>
				<Sidebar />
				{openLoadingPopup && <LoadingPopup />}
				{openWidgetInFullScreen && <FullScreenPopup />}
				<div className={styles.MainWrapper}>
					{pathname !== "/admin/manage-user" &&
						pathname !== "/admin/manage-user-dashboard" &&
						pathname !== "/admin/user-all-dashboards" &&
						pathname !== "/admin/manage-user-widgets" && <TopBar />}

					<div
						className={`${styles.Main} ${
							pathname === "/admin/manage-user" ||
							pathname === "/admin/manage-user-dashboard" ||
							pathname === "/admin/user-all-dashboards"
								? styles.FullHeight
								: ""
						}`}
					>
						<Outlet />
					</div>
				</div>
			</Suspense>
		</div>
	);
};
