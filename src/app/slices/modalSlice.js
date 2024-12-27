import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errors: []
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        addError(state, action) {
            state.errors.push(action.payload);
        },
        removeError(state) {
            state.errors.shift()
        }
    }
})

export const { addError, removeError } = modalSlice.actions;

export default modalSlice.reducer;