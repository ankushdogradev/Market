import React from "react";
import "./SearchBar.scss";

const SearchBar = () => {
  return (
    <>
      <div className="search-wrap">
        <div className="search-input">
          <input type="text" placeholder="Search.." />
          <div className="search-icon">
            <i className="fas fa-search" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;

// https://www.youtube.com/watch?v=QxMBHi_ZiT8
