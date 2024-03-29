/* eslint-disable */
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: '/posts',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),
            transformResponse: (responseData) => {
                const loadedPosts = responseData.map((post) => {
                    post.id = post._id;
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Post', id }))
                    ];
                } else return [{ type: 'Post', id: 'LIST' }];
            }
        }),
        getFollowingPosts: builder.query({
            query: (id) => {
                return {
                    url: `/posts/following/${id}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError;
                    }
                };
            },
            transformResponse: (responseData) => {
                const loadedPosts = responseData.map((post) => {
                    post.id = post._id;
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Post', id }))
                    ];
                } else return [{ type: 'Post', id: 'LIST' }];
            }
        }),
        getTopTags: builder.query({
            query: () => ({
                url: '/posts/tags',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Post', id }))
                    ];
                } else return [{ type: 'Post', id: 'LIST' }];
            }
        }),
        addNewPost: builder.mutation({
            query: (initialPost) => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost
                }
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST' }]
        }),
        updatePost: builder.mutation({
            query: (initialPost) => ({
                url: '/posts',
                method: 'PATCH',
                body: {
                    ...initialPost
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: '/posts',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),
        updateViewCount: builder.mutation({
            query: ({ id }) => ({
                url: 'posts/view',
                method: 'PATCH',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        })
    })
});

export const {
    useGetPostsQuery,
    useGetFollowingPostsQuery,
    useGetTopTagsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useUpdateViewCountMutation
} = postsApiSlice;

// returns the query result object
export const selectPostsResult = postsApiSlice.endpoints.getPosts.select();

// creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    (postsResults) => postsResults.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors((state) => selectPostsData(state) ?? initialState);
/* eslint-enable */
