import React from "react";
import "./App.css";
import { ThemeProvider, createTheme, Arwes, Puffs } from "arwes";
import Nav from "../header/Nav";
import ArticleList from "../articles/ArticleList";
import Subreddits from '../subreddits/Subreddits';

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Arwes>
        <div id="App">
          <Nav />
          <Subreddits />
          <div id="left_puffs">
            <Puffs>
              <div style={{ width: "100%", height: 700 }} />
            </Puffs>
          </div>
          <ArticleList />
          <div id="right_puffs">
            <Puffs>
              <div style={{ width: "100%", height: 700 }} />
            </Puffs>
          </div>
        </div>
      </Arwes>
    </ThemeProvider>
  );
}

export default App;
