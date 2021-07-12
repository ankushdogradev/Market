import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./SearchBar.scss";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="search-container">
          <div className="search-input">
            <input
              type="search"
              placeholder="Search.."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="search-button">
            <button type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
