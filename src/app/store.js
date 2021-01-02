import { configureStore } from '@reduxjs/toolkit';
import articleReducer from '../articles/ArticleSlice';


export default configureStore({
  reducer: {
    articles: articleReducer
  },
});
