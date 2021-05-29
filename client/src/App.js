import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Header/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <div className="content-wrapper">
          <Body />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
