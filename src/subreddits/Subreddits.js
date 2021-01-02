import React from "react";
import { useDispatch } from "react-redux";
import { Button, Project } from "arwes";
import { subredditChanged, fetchArticles } from '../articles/ArticleSlice';
import './subreddits.css'

const subreddits = ["Spaceflight", "SpaceX", "NASA", "Astrophotography", "Astronomy", "Space", "AstronomyMemes"];

export default function Subreddits() {
  const dispatch = useDispatch();

  const onButtonClicked = (item) => {
    dispatch(subredditChanged(item));
    dispatch(fetchArticles(item));
  };

  return (
    <div className="subreddits">
        <div style={{ padding: 20, marginRight: 20 }}>
            <Project
                animate
                header='SELECT TOPIC'
            >
                {subreddits.map((item, index) => {
        return (
          <div style={{ padding: "20px" }} key={index}>
            <Button animate style={{width: 180, textAlign: 'center'}} layer="success" onClick={() => onButtonClicked(item)}>
              <i className="mdi mdi-chemical-weapon" /> {item}
            </Button>
          </div>
        );
      })}
            </Project>
        </div>
    
    </div>
  );
}
