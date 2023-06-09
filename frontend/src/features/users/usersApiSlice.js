/* eslint-disable */
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'User', id }))
                    ];
                } else return [{ type: 'User', id: 'LIST' }];
            }
        }),
        addNewUser: builder.mutation({
            query: (initialUser) => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUser
                }
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }]
        }),
        updateUser: builder.mutation({
            query: (initialUser) => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUser
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        }),
        followUser: builder.mutation({
            query: ({ id, username }) => ({
                url: `/users/follow/${username}`,
                method: 'PATCH',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        }),
        unFollowUser: builder.mutation({
            query: ({ id, username }) => ({
                url: `/users/unfollow/${username}`,
                method: 'PATCH',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        })
    })
});

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useFollowUserMutation,
    useUnFollowUserMutation
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResults) => usersResults.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
/* eslint-enable */
