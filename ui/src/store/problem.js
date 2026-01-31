import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    problemStatement: '',
    language: '',
    showHints: false
};

const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        updateProblemStatement(state, action) {
            state.problemStatement = action.payload;
        },
        updateLanguage(state, action) {
            state.language = action.payload;
        },
        updateShowHints(state, action) {
            state.showHints = action.payload;
        }
    }
});

export const problemActions = problemSlice.actions;
export default problemSlice.reducer;