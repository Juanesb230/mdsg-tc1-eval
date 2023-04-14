<<<<<<< HEAD
import React, { useState } from "react";
import "./App.css";
import Scroll from "./components/atoms/scroll/scroll";
import Input from "./components/atoms/input/input";

function App() {
  const [filter, setFilter] = useState<string>("");
  return (
    <div>
      <header>
        <Input onChange={(e) => setFilter(e.target.value)} />
      </header>
      <Scroll filter={filter} />
=======
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
>>>>>>> e46627b (Initialize project using Create React App)
    </div>
  );
}

export default App;
