import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowUp } from "react-icons/io";
import { SoldProduct } from "../../assets/svg/SvgIndex";
import styles from "./Dashboard.module.scss";
import EditViewBar from "./EditViewBar";

const Dashboard = () => {
	//edit view bar
	const [ViewBarEditPopup, setViewBarEditPopup] = useState(false);
	const [currentEditData, setCurrentEditData] = useState({});

	const handleOpenPopup = (data) => {
		setCurrentEditData(data);
		setViewBarEditPopup(true);
	};

	const handleUpdate = (updatedData) => {
		
	};
	return (
		<>
			{ViewBarEditPopup && (
				<EditViewBar setViewBarEditPopup={setViewBarEditPopup} currentData={currentEditData} onUpdate={handleUpdate} />
			)}
			<div className={styles.Dashboard}>
				<div className={styles.Row1}>
					<div className={styles.Col}>
						<div className={styles.Left}>
							<p>Sold Product</p>
							<h2>157,367</h2>

							<h3>
								<span>
									<IoMdArrowUp />
								</span>
								6.7% Increase
							</h3>
						</div>
						<div className={styles.Right}>
							<div className={styles.Icon}>
								<img src={SoldProduct} alt="" />
							</div>
							<span onClick={() => handleOpenPopup({ title: "Sold Product", icon: SoldProduct })}>
								<BsThreeDots />
							</span>
						</div>
					</div>
					<div className={styles.Col}>
						<div className={styles.Left}>
							<p>Total Revenues</p>
							<h2>$9,741</h2>
							<h3 className={true ? styles.Down : ""}>
								<span>
									<IoMdArrowUp />
								</span>
								13.5% Increase
							</h3>
						</div>
						<div className={styles.Right}>
							<div className={styles.Icon}>
								<img src={SoldProduct} alt="" />
							</div>
							<span onClick={() => handleOpenPopup({ title: "Total Revenues", icon: SoldProduct })}>
								<BsThreeDots />
							</span>
						</div>
					</div>
					<div className={styles.Col}>
						<div className={styles.Left}>
							<p>Web Visiters</p>
							<h2>973K</h2>
							<h3>
								<span>
									<IoMdArrowUp />
								</span>
								6.7% Increase
							</h3>
						</div>
						<div className={styles.Right}>
							<div className={styles.Icon}>
								<img src={SoldProduct} alt="" />
							</div>
							<span onClick={() => handleOpenPopup({ title: "Web Visiters", icon: SoldProduct })}>
								<BsThreeDots />
							</span>
						</div>
					</div>
					<div className={styles.Col}>
						<div className={styles.Left}>
							<p>Bounce Rate</p>
							<h2>81.92%</h2>
							<h3>
								<span>
									<IoMdArrowUp />
								</span>
								6.7% Increase
							</h3>
						</div>
						<div className={styles.Right}>
							<div className={styles.Icon}>
								<img src={SoldProduct} alt="" />
							</div>
							<span onClick={() => handleOpenPopup({ title: "Bounce Rate", icon: SoldProduct })}>
								<BsThreeDots />
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
