import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

const initialState = {
	userDashboards: ls.get("userDashboards") || [],
	openedDashboard: ls.get("openedDashboard") || {},
	userMainDashboard: ls.get("userMainDashboard") || {},
};

const dashboardSlice = createSlice({
	name: "dashboardSlice",
	initialState,
	reducers: {
		setUserDashboards: (state, { payload }) => {
			state.userDashboards = payload;
			ls.set("userDashboards", payload);
		},
		setOpenedDashboard: (state, { payload }) => {
			state.openedDashboard = payload;
			ls.set("openedDashboard", payload);
		},
		setUserMainDashboard: (state, { payload }) => {
			state.userMainDashboard = payload;
			ls.set("userMainDashboard", payload);
		},
		updateOpenedDashboard: (state, { payload }) => {
			// Update the opened dashboard
			state.openedDashboard = payload;
			ls.set("openedDashboard", payload);

			// Find and update the matching dashboard in userDashboards
			const dashboardIndex = state.userDashboards.dashboards?.findIndex((dashboard) => dashboard._id === payload._id);

			if (dashboardIndex !== -1) {
				// Update the matched dashboard
				state.userDashboards.dashboards[dashboardIndex] = payload;
				ls.set("userDashboards", state.userDashboards);
			}
		},
	},
});

export const { setUserDashboards, setOpenedDashboard, updateOpenedDashboard, setUserMainDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
