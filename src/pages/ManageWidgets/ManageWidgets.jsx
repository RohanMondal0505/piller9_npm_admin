import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackYellow from "../../assets/svg/ArrowBackYellow.webp";
import { timeAgo } from "../../components/utils/HelperFunctions";
import ManageWidgetPopup from "./ManageWidgetPopup";
import styles from "./ManageWidgets.module.scss";

const ManageWidgets = () => {
	const { requests, userDetails } = useLocation().state;
	const navigate = useNavigate();

	//widget popup
	const [openWidgetPopup, setOpenWidgetPopup] = useState(false);
	const [clickedRequest, setClickedRequest] = useState({});
	const [clickedUserData, setClickedUserData] = useState(userDetails); // used in popup to show userData

	const handleOpenPopup = (data) => {
		setClickedRequest(data);
		setOpenWidgetPopup(true);
	};

	const { user } = useSelector((state) => state.user);
	return (
		<>
			{openWidgetPopup && <ManageWidgetPopup {...{ setOpenWidgetPopup, clickedRequest, clickedUserData }} />}
			<div className={styles.ManageWidgets}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Users Widget Requests </h2>
						<p>Hello , 👋{user?.name} Welcome to Dashboard</p>
					</div>
					<div className={styles.Right}>
						<div className={styles.Back} onClick={() => navigate("/admin/widget-requests")}>
							<img src={ArrowBackYellow} alt="" />
							<p>Back</p>
						</div>
					</div>
				</div>

				<div className={styles.WCards}>
					{requests?.map((item, index) => (
						<div className={styles.RequestCards} key={index}>
							<div className={styles.Profile}>
								<img src={userDetails?.profilePic} alt="" />
								<div className={styles.Details}>
									<h3>{userDetails?.name || "NA"}</h3>
									<p>@{userDetails?.userName || "NA"}</p>
								</div>
							</div>
							<div className={styles.WidgetData}>
								<h4>
									{item?.type || "NA"} <span>{timeAgo(item?.createdAt)}</span>
								</h4>
								<p>
									{item?.details?.slice(0, 300)}

									{item?.details?.slice(300, 301) && <span onClick={() => handleOpenPopup(item)}> ....Read More</span>}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ManageWidgets;
