import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RootContainer } from "./container/RootContainer";

function App() {
  return (
    <BrowserRouter>
      <RootContainer />
    </BrowserRouter>
  );
}

export default App;
