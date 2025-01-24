import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./slice/dashboardSlice";
import tempSlice from "./slice/tempSlice";
import userSlice from "./slice/userSlice";
import widgetSlice from "./slice/widgetSlice";

const store = configureStore({
	reducer: {
		temp: tempSlice,
		user: userSlice,
		widget: widgetSlice,
		dashboard: dashboardSlice,
	},
});

export default store;
