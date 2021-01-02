import React from "react";
import { Blockquote, Image, Words, Loading } from "arwes";
import ChatIcon from "@material-ui/icons/Chat";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import Comments from "../comments/Comments";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments, threadChanged } from "../comments/commentsSlice";
import "./SingleArticle.css";

const useImage = (article) => {
  let urlToCheck = article.url_overridden_by_dest;
  if (urlToCheck && urlToCheck.startsWith("https://www.youtube")) {
    urlToCheck = urlToCheck.split("=");
    urlToCheck = urlToCheck[urlToCheck.length - 1];
    return (
      <iframe
        title={article.title}
        width="60%"
        height="250"
        src={"https://www.youtube.com/embed/" + urlToCheck}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen={true}
      ></iframe>
    );
  }
  if (urlToCheck && urlToCheck.endsWith("jpg")) {
    return (
      <Image
        style={{
          paddingLeft: 20,
          width: "80%",
          heigth: "auto",
          objectFit: "cover",
        }}
        animate
        resources={article.url_overridden_by_dest}
      ></Image>
    );
  } else if (article.thumbnail !== "self" && article.thumbnail !== "default") {
    return (
      <Image
        style={{
          paddingLeft: 20,
          width: article.thumbnail_width,
          objectFit: "cover",
        }}
        animate
        resources={article.thumbnail}
      ></Image>
    );
  } else {
    return null;
  }
};

export default function SingleArticle(props) {
  const article = props.article.data;
  const dispatch = useDispatch();
  const selectedThread = useSelector((state) => state.comments.thread);
  const threadComments = useSelector((state) => state.comments.comments);
  const commentStatus = useSelector((state) => state.comments.status);

  const changeThread = (permalink) => {
    dispatch(threadChanged(permalink));
    dispatch(fetchComments(permalink));
  };

  const renderComments = (permalink) => {
    if (selectedThread === permalink && threadComments) {
      if (commentStatus === "loading") {
        return <Loading />;
      } else if (commentStatus === "succeeded") {
        return <Comments comments={threadComments} />;
      }
    }
  };

  return (
    <div className="article_div">
      <React.Fragment>
        <a
          style={{ textDecoration: "none" }}
          href={article.url}
          target="_blank noopener noreferrer"
        >
          <Blockquote>{article.title}</Blockquote>
          {useImage(article)}
        </a>
        <div style={{ display: "flex", padding: 10 }}>
          <ImportExportIcon style={{ margin: 10 }} />
          <span style={{ marginTop: 5 }}>
            <Words>{article.ups}</Words>
          </span>
          <ChatIcon
            style={{ margin: 10, marginLeft: "10%", cursor: 'pointer' }}
            onClick={() => changeThread(article.permalink)}
          />
          <span style={{ marginTop: 5 }}>
            <Words>{article.num_comments}</Words>
          </span>
        </div>
        {renderComments(article.permalink)}
      </React.Fragment>
    </div>
  );
}
