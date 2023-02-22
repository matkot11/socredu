import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@/store/store";

export interface UserState {
  name: string;
  image: string;
}

const initialState: UserState = {
  name: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action) {
      return (state = {
        name: action.payload.name,
        image: action.payload.image,
      });
    },
  },
});

export const { setUserState } = userSlice.actions;
export const selectUserState = (state: AppState) => state.user;
export default userSlice.reducer;
