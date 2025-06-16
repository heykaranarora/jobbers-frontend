import { createSlice } from "@reduxjs/toolkit";
const appllicationSlice =createSlice({
    name: "application",
    initialState: {
        applicants: [],
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
    },
});
export const { setAllApplicants } = appllicationSlice.actions;
export default appllicationSlice.reducer;