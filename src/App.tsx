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
    </div>
  );
}

export default App;
