import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    comments: [],
    thread: '',
    status: 'idle',
    error: null
};

// Async fetch for posts to fake api
export const fetchComments = createAsyncThunk('comments/fetchComments', async (permalink) => {
    const response = await axios.get(`https://www.reddit.com${permalink}.json`);
    return response.data[1].data.children;
});


const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
      threadChanged(state, action) {
        const newThread = action.payload.toLowerCase();
        state.thread = newThread;
      }
    },
    extraReducers: {
        [fetchComments.pending]: (state, action) => {
          state.status = 'loading'
        },
        [fetchComments.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          // Add any fetched articles to the array
          state.comments = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      }
});

export const { threadChanged } = commentSlice.actions;

export const selectAllComments = state => state.comments.comments;

export default commentSlice.reducer;
