import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3080' }),
    tagTypes: ['Post', 'User'],
    endpoints: builder => ({})
})