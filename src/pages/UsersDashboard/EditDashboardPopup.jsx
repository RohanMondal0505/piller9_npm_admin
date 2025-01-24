import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CrossButton, PlusButton } from "../../assets/svg/SvgIndex";
import axios from "../../components/Hooks/axios";
import { setUserMainDashboard } from "../../redux/slice/dashboardSlice";
import { setOpenLoadingPopup } from "../../redux/slice/tempSlice";
import styles from "./AddWidgetPopup.module.scss";

const EditDashboardPopup = ({ setOpenEditWidgetPopup }) => {
	const dispatch = useDispatch();
	const { userMainDashboard } = useSelector((state) => state.dashboard);
	const [selectedWidgets, setSelectedWidgets] = useState(userMainDashboard?.widgets || []);
	const [widgetButtons, setWidgetButtons] = useState(["ListAgent", "Dimensions", "Segments", "Time", "Filter"]);

	// Add widget to selectedWidgets
	const handleAddWidget = (widget) => {
		setSelectedWidgets((prev) => [...prev, { name: widget, isLocked: false, isCollapsed: false }]);
	};
	// Remove widget from selectedWidgets
	const handleRemoveWidget = (widgetName) => {
		setSelectedWidgets((prev) => prev.filter((widget) => widget.name !== widgetName));
	};

	const handleSaveChanges = () => {
		const layout = selectedWidgets.map((_, index) => ({
			i: `box${index + 1}`,
			x: (index % 2) * 6,
			y: Math.floor(index / 2) * 8,
			w: 6,
			h: 8,
		}));

		const payload = {
			widgets: selectedWidgets,
			layout,
		};

		dispatch(setOpenLoadingPopup(true));
		axios
			.post(`/main-dashboard/create?userId=${userMainDashboard?.createdBy?._id}`, payload)
			.then(({ data }) => {
				toast.success("Layout updated successfully...");
				setOpenEditWidgetPopup(false);
				dispatch(setUserMainDashboard(data?.data));
			})
			.catch((err) => {
				toast.error(err?.response?.data?.message || "Error Updating Dashboard.");
			})
			.finally(() => dispatch(setOpenLoadingPopup(false)));
	};

	return (
		<div className={styles.AddWidgetPopup} onClick={() => setOpenEditWidgetPopup(false)}>
			<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Edit Dashboard</h2>
					</div>
					<div className={styles.Right}>
						<button onClick={() => setOpenEditWidgetPopup(false)}>Discard</button>
						<button onClick={handleSaveChanges}>Save</button>
					</div>
				</div>

				{/* Widget Buttons */}
				<div className={styles.WidgetButtons}>
					{widgetButtons.map((item, index) => (
						<div key={index} className={styles.WidgetBtn}>
							<p>{item}</p>
							{selectedWidgets.some((widget) => widget.name === item) ? (
								<span className={styles.CrossButton} onClick={() => handleRemoveWidget(item)}>
									<img src={CrossButton} alt="Remove" title="Remove" />
								</span>
							) : (
								<span className={styles.Show} onClick={() => handleAddWidget(item)}>
									<img src={PlusButton} alt="Add" title="Add" />
								</span>
							)}
						</div>
					))}
				</div>

				{/* Selected Widgets */}
				<div className={styles.AllWidgets}>
					{selectedWidgets.map((widget, i) => (
						<div key={i} className={styles.WidgetBox}>
							{widget.name} Widget
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default EditDashboardPopup;
