import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import selectReducer from "../features/reactSelect/RectSelectSlice";
import gridReducer from "../features/agGrid/aggridSlice";
import createSalesOrderReducer from "../features/salesmodule/createSalesOrderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    select: selectReducer,
    aggrid:gridReducer,
    createSalesOrder:createSalesOrderReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
