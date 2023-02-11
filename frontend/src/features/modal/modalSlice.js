import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: { open: false, type: null, username: '' },
    reducers: {
        setOpen: (state, action) => {
            const { open } = action.payload
            state.open = open
        },
        setType: (state, action) => {
            const { type } = action.payload
            state.type = type
        },
        setUsername: (state, action) => {
            const { username } = action.payload
            state.username = username
        },
    }
})

export const { setOpen, setType, setUsername } = modalSlice.actions

export default modalSlice.reducer

export const selectCurrentOpen = (state) => state.modal.open
export const selectCurrentType = (state) => state.modal.type
export const selectCurrentUsername = (state) => state.modal.username