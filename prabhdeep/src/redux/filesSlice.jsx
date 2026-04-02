import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({ // Removed the wrapping array []
    name: "files",
    initialState: {
        storedFiles: [],
    },
    reducers: {
        addFiles: (state, action) => {
            state.storedFiles.push(...action.payload); 
        },
        deleteFile: (state, action) => {
            state.storedFiles = state.storedFiles.filter(
                (_, index) => index !== action.payload
            );
        },
    },
});

export const { addFiles, deleteFile } = filesSlice.actions;
export default filesSlice.reducer;