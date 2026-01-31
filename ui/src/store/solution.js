import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showHints: false,
  hints: [],
  intuition: "",
  code: "",
  timeComplexity: "",
  dataStructures: "",
  algorithms: "",
};

const solutionSlice = createSlice({
  name: "solution",
  initialState,
  reducers: {
    updateHints(state, action) {
      state.hints = action.payload;
    },
    updateSolution(state, action) {
      const { intuition, code, timeComplexity, dataStructures, algorithms } =
        action.payload;

      state.intuition = intuition;
      state.code = code;
      state.timeComplexity = timeComplexity;
      state.dataStructures = dataStructures;
      state.algorithms = algorithms;
    }
  },
});

export const solutionActions = solutionSlice.actions;
export default solutionSlice.reducer;
