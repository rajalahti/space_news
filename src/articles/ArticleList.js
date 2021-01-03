import React, { useEffect, useState } from "react";
import SingleArticle from "./SingleArticle";
import "./ArticleList.css";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "arwes";
import {
  selectAllArticles,
  fetchArticles,
  subredditChanged,
} from "./ArticleSlice";
import { subreddits } from "../subreddits/Subreddits";
import { SelectField } from "../header/InputComponents";
import { useStyles } from "../header/Nav";

export default function ArticleList() {
  const dispatch = useDispatch();

  const articles = useSelector(selectAllArticles);

  const articleStatus = useSelector((state) => state.articles.status);

  const subreddit = useSelector((state) => state.articles.subreddit);

  const classes = useStyles();

  useEffect(() => {
    if (articleStatus === "idle") {
      dispatch(fetchArticles(subreddit));
    }
  }, [subreddit, articleStatus, dispatch]);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (articleStatus === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [articleStatus]);

  const handleSubredditChange = (e) => {
    dispatch(subredditChanged(e.target.value));
    dispatch(fetchArticles(e.target.value));
  };

  return (
    <section className="article_list">
      <div className="topic_select">
        <SelectField
          values={subreddits}
          label="Select topic"
          stateValue={subreddit}
          onChange={handleSubredditChange}
          className={classes.root}
        />
      </div>
      {loading ? (
        <Loading large animate full />
      ) : (
        articles.map((item, index) => {
          return <SingleArticle key={index} article={item} />;
        })
      )}
      
    </section>
  );
}
