import React from "react";
import { CiSearch } from "react-icons/ci";
import { VscBellDot } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styles from "./TopBar.module.scss";

const TopBar = () => {
	const { pathname } = useLocation();
	const { user } = useSelector((state) => state.user);
	return (
		<div className={styles.TopBar}>
			<div className={styles.Left}>
				{pathname === "/admin/manage-dashboard-widgets" && <h1>Manage Dashboard Widget</h1>}
				{pathname === "/admin/widget-requests" && <h1>Widgets Requests</h1>}
				{pathname === "/admin/dashboard" && <h1> Dashboard</h1>}
				{pathname === "/admin/users-dashboard" && <h1>Users Dashboards</h1>}
				{pathname === "/admin/user-all-dashboards" && <h1>Users All Dashboards</h1>}
				{pathname === "/admin/manage-user-widgets" && <h1>Users All widget Requests</h1>}

				{pathname === "/data-table" && <h1>List Agent</h1>}

				<p>Hello , 👋{user?.name} Welcome to Dashboard</p>
			</div>

			<div className={styles.Right}>
				{pathname === "/dashboard1" && <button>Add New Widget</button>}

				<div className={styles.InputWrapper}>
					<CiSearch />
					<input type="search" name="" id="" placeholder="Search Anything" />
				</div>

				<div className={styles.Notifications}>
					<VscBellDot />
				</div>
				<div className={styles.Profile}>
					<img src={user?.profilePic} alt="" />
				</div>
			</div>
		</div>
	);
};

export default TopBar;
