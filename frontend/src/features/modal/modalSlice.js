import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: { open: false, type: null },
    reducers: {
        setOpen: (state, action) => {
            const { open } = action.payload
            console.log(open)
            state.open = open
        },
        setType: (state, action) => {
            const { type } = action.payload
            console.log(type)
            state.type = type
        }
    }
})

export const { setOpen, setType } = modalSlice.actions

export default modalSlice.reducer

export const selectCurrentOpen = (state) => state.modal.open
export const selectCurrentType = (state) => state.modal.type