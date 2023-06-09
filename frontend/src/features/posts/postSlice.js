import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        id: '',
        title: '',
        subHeading: '',
        content: '',
        tags: '',
        cover: '',
        isError: false,
        errMsg: ''
    },
    reducers: {
        setPost: (state, action) => {
            const { id, title, subHeading, tags, cover, content } = action.payload;

            state.id = id;
            state.title = title;
            state.subHeading = subHeading;
            state.tags = tags;
            state.cover = cover;
            state.content = content;
        },
        setTitle: (state, action) => {
            const { title } = action.payload;

            state.title = title;
        },
        setSubhead: (state, action) => {
            const { subHeading } = action.payload;

            state.subHeading = subHeading;
        },
        setContent: (state, action) => {
            const { content } = action.payload;

            state.content = content;
        },
        setTags: (state, action) => {
            const { tags } = action.payload;

            state.tags = tags;
        },
        setCover: (state, action) => {
            const { cover } = action.payload;

            state.cover = cover;
        },
        setError: (state, action) => {
            const { errMsg } = action.payload;

            state.isError = true;
            state.errMsg = errMsg;
        },
        resetError: (state, action) => {
            state.isError = false;
            state.errMsg = '';
        },
        reset: (state, action) => {
            state.id = '';
            state.title = '';
            state.subHeading = '';
            state.content = '';
            state.tags = '';
            state.cover = '';
            state.isError = false;
            state.errMsg = '';
        }
    }
});

export const {
    setPost,
    setTitle,
    setSubhead,
    setContent,
    setTags,
    setCover,
    setError,
    resetError,
    reset
} = postSlice.actions;

export default postSlice.reducer;

export const selectCurrentPost = (state) => state.post;

export const selectCurrentPostErr = (state) => [state.post.isError, state.post.errMsg];
