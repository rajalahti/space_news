import React from "react";
import { Words } from "arwes";
import { TimeAgo } from './TimeAgo';

const styles = {
    root: {
        margin: 20,
    },
    author: {

    },
    timeStamp: {
        fontSize: '.0.7em'
    },
    body: {
        fontSize: '0.8em'
    }
}

export default function Comments(props) {
  return (
    <div>
      {props.comments.map((item, index) => {
        return (
          <div style={styles.root} key={index}>
            <p><Words animate layer='success'>
                  {item.data.author}
              </Words></p>
              <TimeAgo timeStamp={item.data.created_utc} />
            <p style={styles.body}>
              <Words animate>{item.data.body}</Words>
            </p>
          </div>
        );
      })}
    </div>
  );
}
