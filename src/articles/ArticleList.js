import React, { useEffect, useState } from "react";
import SingleArticle from "./SingleArticle";
import './ArticleList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from "arwes";
import { selectAllArticles, fetchArticles } from './ArticleSlice';

export default function ArticleList() {
 const dispatch = useDispatch();
  
  const articles = useSelector(selectAllArticles);

  const articleStatus = useSelector(state => state.articles.status);

  const subreddit = useSelector(state => state.articles.subreddit)

  useEffect(() => {
    if (articleStatus === 'idle') {
      dispatch(fetchArticles(subreddit));
    }
  }, [subreddit, articleStatus, dispatch]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (articleStatus === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [articleStatus]);

  return (
    <section class="article_list">
      {loading ? <Loading large animate full /> : 
      (
      articles.map((item, index) => {
        return <SingleArticle key={index} article={item}/>;
      })
      )};
    </section>
  );
};
