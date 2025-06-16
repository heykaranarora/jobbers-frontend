import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        admin: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAdmin: (state, action) => {
            state.admin = action.payload;
        },
        clearAdmin: (state) => {
            state.admin = null;
        },
        
    },
});

export const { setLoading, setAdmin,clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;