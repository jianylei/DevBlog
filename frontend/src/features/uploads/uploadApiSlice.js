import { apiSlice } from '../../app/api/apiSlice';

export const uploadsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        upload: builder.mutation({
            query: (body) => ({
                url: '/upload',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useUploadMutation } = uploadsApiSlice;
