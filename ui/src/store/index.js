import { combineReducers, configureStore } from "@reduxjs/toolkit";
import problemReducer from "./problem";
import solutionReducer from "./solution";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  problem: problemReducer,
  solution: solutionReducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["problem", "solution"],
};

const storePersistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: storePersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);
