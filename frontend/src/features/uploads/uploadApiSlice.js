import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const uploadsAdapter = createEntityAdapter()

export const uploadsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        upload: builder.mutation({
            query: body => ({
                url: '/upload',
                method: 'POST',
                body: body
            })
        })
    })
})

export const {
    useUploadMutation
} = uploadsApiSlice