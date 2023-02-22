import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { userSlice } from "@/store/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;

const store = makeStore();
export default store;
