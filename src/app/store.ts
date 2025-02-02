import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "./features/counter/counter-slice";
import { createLogger } from "redux-logger";
import { rootMiddlewareApiV0, rootReducerApiV0 } from "./api/v0";
import { authReducers, themeReducers } from "./features";

const logger = createLogger({
  // optional configuration
  collapsed: true,
  diff: true,
});

const rootReducer = combineReducers({
  ...rootReducerApiV0,
  counter: counterReducer,
  auth: authReducers,
  theme: themeReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger).concat(rootMiddlewareApiV0);
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
