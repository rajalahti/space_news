import React, { useState } from "react";
import { Header } from "arwes";
import { useDispatch } from "react-redux";
import { filterArticles } from '../articles/ArticleSlice';
import './Nav.css';
import { TextInput } from "./InputComponents";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "300px",
    marginBottom: 10,
    "& .MuiOutlinedInput-input": {
      color: "#029dbb",
    },
    "& .MuiInputLabel-root": {
      color: "#029dbb",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#029dbb",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "red",
    },
    "&:hover .MuiInputLabel-root": {
      color: "red",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#029dbb",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#029dbb",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#029dbb",
    },
    '& label.Mui-focused': {
        color: '#029dbb',
    },
  },
});

export default function Nav() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(filterArticles(e.target.value));
  };

  return (
    <header>
      <div style={{ padding: 20 }} >
        <Header animate>
          <div className="nav_content">
          <h1 style={{ margin: 0, width: 300 }}>Space News</h1>
          <TextInput label="Search" className={classes.root} onChange={handleSearchTermChange} />
          </div>
        </Header>
        
      </div>
    </header>
  );
};
