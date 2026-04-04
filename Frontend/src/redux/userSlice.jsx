import { createSlice } from "@reduxjs/toolkit";

// 1. Check localStorage when the app first loads
const storedAuthStatus = localStorage.getItem("isAuthenticated") === "true";

const userSlice = createSlice({
	name: "user",
	initialState: {
		// 2. Set initial state based on localStorage instead of a hardcoded false
		isAuthenticated: storedAuthStatus,
	},
	reducers: {
		setIsAuth: (state) => {
			state.isAuthenticated = true;
			// 3. Save to localStorage so it survives page refreshes
			localStorage.setItem("isAuthenticated", "true");
		},
		// Bonus: A logout action to clear it!
		logout: (state) => {
			state.isAuthenticated = false;
			localStorage.removeItem("isAuthenticated");
		},
	},
});

export const { setIsAuth, logout } = userSlice.actions;
export default userSlice.reducer;
