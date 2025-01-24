import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

const initialState = {
	user: ls.get("superAdmin_data") || {},
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload || {};
			ls.set("superAdmin_data", payload);
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
