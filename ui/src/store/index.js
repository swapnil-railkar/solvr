import { combineReducers, configureStore } from "@reduxjs/toolkit";
import problemReducer from "./problem";
import solutionReducer from "./solution";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  problem: problemReducer,
  solution: solutionReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["problem", "solution"],
};

const storePersistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: storePersistReducer,
});

export const persistor = persistStore(store);
