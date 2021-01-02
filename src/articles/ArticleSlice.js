import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    articles: [],
    filteredArticles: [],
    subreddit: 'Spaceflight',
    status: 'idle',
    error: null
};

// Async fetch for posts to fake api
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (subreddit) => {
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
    return response.data.data.children;
});


const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
      subredditChanged(state, action) {
        const newSubreddit = action.payload.toLowerCase();
        state.subreddit = newSubreddit;
      },
      filterArticles(state, action) {
        const searchTerm = action.payload;
        state.filteredArticles = state.articles.filter(item => item.data.title.toLowerCase().includes(searchTerm.toLowerCase()));
      }
    },
    extraReducers: {
        [fetchArticles.pending]: (state, action) => {
          state.status = 'loading'
        },
        [fetchArticles.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          // Add any fetched articles to the array
          state.articles = action.payload;
          state.filteredArticles = action.payload;
        },
        [fetchArticles.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      }
});

export const { subredditChanged, filterArticles } = articleSlice.actions;

export const selectAllArticles = state => state.articles.filteredArticles;

export const selectSingleArticle = state => state.filter(id => state.articles);

export default articleSlice.reducer;
