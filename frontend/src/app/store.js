import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import authReducer from '../features/auth/authSlice'
import modalReducer from '../features/modal/modalSlice'
import postReducer from '../features/posts/postSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        modal: modalReducer,
        post: postReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})

setupListeners(store.dispatch)