import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import { setupListener } from "@reduxjs/toolkit/dist/query"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})

setupListener(store.dispatch)