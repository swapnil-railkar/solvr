import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./problem";
import solutionReducer from "./solution";

const store = configureStore({
    reducer: {problem: problemReducer, solution: solutionReducer}
})

export default store;