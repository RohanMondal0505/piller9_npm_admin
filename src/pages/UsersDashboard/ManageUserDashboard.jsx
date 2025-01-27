import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackYellow from "../../assets/svg/ArrowBackYellow.webp";
import Layout from "../../assets/svg/Layout.webp";
import axios from "../../components/Hooks/axios";
import { setUserMainDashboard } from "../../redux/slice/dashboardSlice";
import { setOpenLoadingPopup } from "../../redux/slice/tempSlice";
import EditDashboardPopup from "./EditDashboardPopup";
import styles from "./ManageUser.module.scss";
import Widgets from "./Widgets";

const ManageUserDashboard = () => {
	const [openEditWidgetPopup, setOpenEditWidgetPopup] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { userMainDashboard } = useSelector((state) => state.dashboard);
	const [showUpdateButton, setShowUpdateButton] = useState(false); //for show save layout button

	const [dashboardData, setDashboardData] = useState(userMainDashboard);

	const [gridWidth, setGridWidth] = useState(window.innerWidth * 0.8);

	useEffect(() => {
		// Function to calculate 80vw based on window width
		const updateGridWidth = () => {
			setGridWidth(window.innerWidth * 0.8);
		};

		updateGridWidth();

		window.addEventListener("resize", updateGridWidth);
		return () => window.removeEventListener("resize", updateGridWidth);
	}, []);

	const defaultLayout = [
		{ i: "box1", x: 0, y: 0, w: 12, h: 8, isDraggable: true, isResizable: true },
		{ i: "box2", x: 0, y: 8, w: 6, h: 8, isDraggable: true, isResizable: true },
		{ i: "box3", x: 6, y: 8, w: 6, h: 8, isDraggable: true, isResizable: true },
		{ i: "box4", x: 0, y: 16, w: 8, h: 8, isDraggable: true, isResizable: true },
		{ i: "box5", x: 8, y: 16, w: 4, h: 8, isDraggable: true, isResizable: true },
	];

	const [layout, setLayout] = useState(() => {
		const savedLayout = userMainDashboard?.layout;
		return savedLayout ? savedLayout : defaultLayout;
	});

	const handleLayoutChange = (newLayout) => {
		setLayout(newLayout);
		setDashboardData((prev) => ({
			...prev,
			layout: newLayout,
		}));
		setShowUpdateButton(true);
	};

	const handleWidgetStateChange = (index, key, value) => {
		setDashboardData((prev) => {
			const updatedWidgets = prev.widgets.map((widget, i) => (i === index ? { ...widget, [key]: value } : { ...widget }));

			// Update layout immediately based on `isLocked`
			const updatedLayout = layout.map((item, i) => {
				if (i === index && key === "isLocked") {
					return {
						...item,
						isDraggable: !value, // Lock = not draggable
						isResizable: !value, // Lock = not resizable
					};
				}
				if (i === index && key === "isCollapsed") {
					return {
						...item,
						isResizable: !value,
						h: value ? 1 : 8,
					};
				}
				return item;
			});

			setLayout(updatedLayout);

			return { ...prev, widgets: updatedWidgets };
		});
	};

	const [updatingLayout, setUpdatingLayout] = useState(false);
	const handleSaveLayout = () => {
		setUpdatingLayout(true);
		dispatch(setOpenLoadingPopup(true));
		axios
			.post(`/main-dashboard/create?userId=${dashboardData?.createdBy?._id}`, {
				widgets: dashboardData?.widgets,
				layout: dashboardData?.layout,
			})
			.then(({ data }) => {
				dispatch(setUserMainDashboard(data?.data));
				toast.success("Layout Updated Successfully...");
			})
			.catch((err) => {
				toast.error(err?.response?.data?.message || "Error Updating Dashboard layout..");
			})
			.finally(() => {
				setUpdatingLayout(false);
				dispatch(setOpenLoadingPopup(false));
			});
	};

	useEffect(() => {
		setDashboardData(userMainDashboard);
		setLayout(userMainDashboard?.layout);
		setShowUpdateButton(false);
	}, [userMainDashboard]);

	return (
		<>
			{openEditWidgetPopup && <EditDashboardPopup {...{ setOpenEditWidgetPopup }} />}
			<div className={styles.ManageUser}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Users Widget Requests </h2>
						<p>Hello , 👋{user?.name} Welcome to Dashboard</p>
					</div>
					<div className={styles.Right}>
						{showUpdateButton && (
							<>
								{updatingLayout ? (
									<button className={styles.UpdateButton}>Updating ....</button>
								) : (
									<button className={styles.UpdateButton} onClick={handleSaveLayout}>
										Save Layout
									</button>
								)}
							</>
						)}

						<div className={styles.EditLayout} onClick={() => setOpenEditWidgetPopup(true)}>
							<img src={Layout} alt="" />
							<p>Manage layout</p>
						</div>
						<div className={styles.Back} onClick={() => navigate("/admin/user-all-dashboards")}>
							<img src={ArrowBackYellow} alt="" />
							<p>Back</p>
						</div>
					</div>
				</div>

				<div className={styles.Row2}>
					<div className={styles.Widgets}>
						<GridLayout
							className="layout"
							layout={layout}
							cols={12}
							rowHeight={40}
							width={gridWidth}
							draggableHandle=".dragHandle"
							onLayoutChange={handleLayoutChange}
						>
							{dashboardData?.widgets?.map((widget, i) => (
								<div
									key={`box${i + 1}`}
									className={styles.gridItem}
									data-grid={{
										...layout[i],
										isDraggable: layout[i]?.isDraggable ?? true, // Default to true
										isResizable: layout[i]?.isResizable ?? true, // Default to true
										static: !layout[i]?.isDraggable && !layout[i]?.isResizable, // Make static if non-draggable and non-resizable
									}}
								>
									<Widgets item={widget} index={i} onWidgetStateChange={handleWidgetStateChange} />
								</div>
							))}
						</GridLayout>
					</div>
				</div>
			</div>
		</>
	);
};

export default ManageUserDashboard;
