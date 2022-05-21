import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import "./App.scss";
import MainBody from "./components/mainBody/mainBody";

function App() {
  return (
    <div className="App">
      <div className="app__wrapper">
        <Sidebar />
        <MainBody />
      </div>
    </div>
  );
}

export default App;
