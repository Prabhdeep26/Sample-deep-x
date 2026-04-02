import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
	{
		name: "user",
		initialState: {
			isLoggedIn: false,
		},
		reducers: {
			setIsLoggin: (state) => {
				state.isLoggedIn = !state.isLoggedIn;
			},
		},
	},
);

export const { setIsLoggin } = userSlice.actions;
export default userSlice.reducer;
