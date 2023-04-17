import React from "react";
import "./App.scss";

import CardList from "./components/organisms/pokemon-list/pokemon-list";
import SearchCard from "./components/molecules/pokemon-card/pokemon-card";

function App() {
  return (
    <div className="App">
      <SearchCard />
      <CardList />
    </div>
  );
}

export default App;
