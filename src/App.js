import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Import pages
import { Navigation } from "./components/Navigation";
import { Home } from "./components/pages/Home";
import { AiNFT } from "./components/pages/AiNFT";
import { HumanNFT } from "./components/pages/HumanNFT";

import "./style/App.css";

function App() {
  const [account, setAccount] = useState("");
  return (
    <Router>
      <Navigation account={account} setAccount={setAccount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AiNFT" element={<AiNFT />} />
        <Route path="/HumanNFT" element={<HumanNFT />} />
      </Routes>
    </Router>
  );
}

export default App;
