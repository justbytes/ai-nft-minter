import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";

import Navbar from "./components/Navbar";

//Import styling
import "./style/App.css";

function App() {
  const [account, setAccount] = useState("");
  return (
    <div>
      <Navbar account={account} setAccount={setAccount} />
      <h1>Lets make some NFTs</h1>
    </div>
  );
}

export default App;
