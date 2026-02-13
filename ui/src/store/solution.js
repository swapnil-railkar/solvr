import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showHints: false,
  hints: ["Test hint 1",
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    "Test hint 3",
    "Test hint 4",],
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
