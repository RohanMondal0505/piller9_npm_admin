import React from "react";
import { RxCross2 } from "react-icons/rx";
import { timeAgo } from "../../components/utils/HelperFunctions";
import styles from "./ManageWidgetPopup.module.scss";

const ManageWidgetPopup = ({ setOpenWidgetPopup, clickedRequest, clickedUserData }) => {
	return (
		<div className={styles.ManageWidgetPopup} onClick={() => setOpenWidgetPopup(false)}>
			<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={styles.Profile}>
					<img src={clickedUserData?.profilePic} alt="" />
					<div className={styles.Details}>
						<h3>{clickedUserData?.name || "NA"}</h3>
						<p>@{clickedUserData?.userName || "NA"}</p>
					</div>
				</div>
				<div className={styles.WidgetData}>
					<h4>
						{clickedRequest?.type || "NA"} <span>{timeAgo(clickedRequest?.createdAt)}</span>
					</h4>
					<p>{clickedRequest?.details}</p>
				</div>
				<div className={styles.ButtonWrapper}>
					<button onClick={() => setOpenWidgetPopup(false)}>
						<RxCross2 />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ManageWidgetPopup;
