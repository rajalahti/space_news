import React from "react";
import { Blockquote, Image, Words } from "arwes";
import ChatIcon from '@material-ui/icons/Chat';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const shortTitle = (str, maxLength) => {
  let title = str;
  const length = title.length;
  if (length > maxLength) {
    title = title.split(" ");
    let newTitle = "";
    let count = 0;
    let wordLength = 0;
    let currentWord = 0;
    while (title[currentWord] && count < maxLength) {
      wordLength = title[currentWord].length;
      newTitle = newTitle.concat(title[currentWord], " ");
      currentWord++;
      count = count + wordLength;
    }
    return newTitle.concat("...");
  } else {
    return title;
  }
};

const useImage = (article) => {
  let urlToCheck = article.url_overridden_by_dest;
  if (urlToCheck && urlToCheck.startsWith('https://www.youtube')) {
    urlToCheck = urlToCheck.split('=');
    urlToCheck = urlToCheck[urlToCheck.length - 1];
    return (
      <iframe title={article.title} width="60%" height="250" src={'https://www.youtube.com/embed/' + urlToCheck} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen={true}></iframe>
    )
  }
  if (urlToCheck && urlToCheck.endsWith("jpg")) {
    return (
      <Image style={{ paddingLeft: 20, width: '80%', heigth: 'auto', objectFit: 'cover'}} animate resources={article.url_overridden_by_dest}></Image>
    )
  } else if (article.thumbnail !== 'self' && article.thumbnail !== 'default' ) {
    return (
      <Image style={{ paddingLeft: 20, width: article.thumbnail_width,  objectFit: 'cover'}} animate resources={article.thumbnail}></Image>
    )
  } else {
    return (
     null
    )
  }
}

export default function SingleArticle(props) {
  const article = props.article.data;
  return (
    <div style={{ padding: 20, width: '80%', maxHeigth: 100, minHeight: 100, border: '1px solid rgb(139,235,254, 0.7)', borderRadius: 10, margin: 30, backgroundColor: 'rgb(139,235,254, 0.05)' }}>
      <React.Fragment>
        <a style={{textDecoration: 'none'}} href={article.url} target="_blank noopener noreferrer">
          <Blockquote >{shortTitle(article.title, 100)}</Blockquote>
        {useImage(article)}
        </a>
        <div style={{display: 'flex', padding: 10}}>
        <ImportExportIcon style={{margin: 10}}/> 
        <span style={{marginTop: 5}}><Words>
        {article.ups}
        </Words></span>
        <ChatIcon style={{margin: 10, marginLeft: '10%'}}/> 
        <span style={{marginTop: 5}}><Words>
        {article.num_comments}
        </Words></span>
        </div>
      </React.Fragment>
    </div>
  );
}
