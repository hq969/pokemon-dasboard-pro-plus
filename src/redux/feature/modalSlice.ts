import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
    title: "",
    body: null,
    image: null
}

// Create a slice
const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        // Show modal
        showModal: (state, action) => {
            state.title = action.payload.title;
            state.image = action.payload.image;
            state.body = action.payload.body;
        },
        // Hide modal
        hideModal: (state) => {
            state.title = "";
            state.body = null;
            state.image = null;
        }
    }
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
