import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: { open: false, type: null },
    reducers: {
        setOpen: (state, action) => {
            const { open } = action.payload
            state.open = open
        },
        setType: (state, action) => {
            const { type } = action.payload
            state.type = type
        }
    }
})

export const { setOpen, setType } = modalSlice.actions

export default modalSlice.reducer

export const selectCurrentOpen = (state) => state.modal.open
export const selectCurrentType = (state) => state.modal.type