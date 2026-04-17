import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Profile = {
  id: number;
  name: string;
  email: string;
  bio: string;
  photoProfile: string;
};

const initialState: Profile = {
  id: 0,
  name: "",
  email: "",
  bio: "",
  photoProfile: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (_state, action: PayloadAction<Profile>) => {
      return action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;