import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	profileDetails: null,
	location: { lat: 28.7041, lng: 77.1025 },
	deviceLocation: "Delhi, India",
	deviceCountry: "Delhi",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser(state, action) {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		updateProfileDetails(state, action) {
			state.profileDetails = action.payload;
			localStorage.setItem("profileDetails", JSON.stringify(action.payload));
		},
	},
});

export const { updateUser, updateProfileDetails } = userSlice.actions;
export default userSlice.reducer;

export const getUser = (state) => state.user.user;
export const getProfileDetails = (state) => state.user.profileDetails;
