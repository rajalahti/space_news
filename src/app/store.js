import { configureStore } from '@reduxjs/toolkit';
import articleReducer from '../articles/ArticleSlice';
import commentReducer from '../comments/commentsSlice';


export default configureStore({
  reducer: {
    articles: articleReducer,
    comments: commentReducer
  },
});
