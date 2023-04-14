import React, { useState } from "react";
import "./App.scss";
import Scroll from "./components/atoms/scroll/scroll";
import Input from "./components/atoms/input/input";

function App() {
  const [filter, setFilter] = useState<string>("");
  return (
    <main>
      <header>
        <Input onChange={(e) => setFilter(e.target.value)} placeholder="Busca el pokemon" />
      </header>
      <Scroll filter={filter} />
    </main>
  );
}

export default App;
