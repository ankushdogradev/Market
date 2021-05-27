import React from "react";
import Navbar from "./components/Header/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <div className="content-wrapper">
          <Body />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
