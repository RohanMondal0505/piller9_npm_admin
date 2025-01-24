import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	openLoadingPopup: false,
};

const tempSlice = createSlice({
	name: "tempSlice",
	initialState,
	reducers: {
		setOpenLoadingPopup: (state, { payload }) => {
			state.openLoadingPopup = payload;
		},
	},
});

export const { setOpenLoadingPopup } = tempSlice.actions;

export default tempSlice.reducer;
