import { configureStore } from "@reduxjs/toolkit";
import filesSlice from "./filesSlice";
import userSlice from "./userSlice";

const store = configureStore({
	reducer: {
		files: filesSlice,
		user: userSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ["files/addFiles"],
				// Ignore these field paths in the state
				ignoredPaths: ["files.storedFiles"],
			},
		}),
});

export default store;
