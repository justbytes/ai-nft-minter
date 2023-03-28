import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
//Import pages
import { Navigation } from "./components/Navigation";
import { Home } from "./components/pages/Home";
import { AiNFT } from "./components/pages/AiNFT";

//Import contract ABI
import ABI from "./abi/NFT.json";

import "./style/App.css";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");
  const [signer, setSigner] = useState("");
  const [nft, setNFT] = useState(null);

  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);

      const network = await provider.getNetwork();

      const nft = new ethers.Contract(
        "0x5a5fe2dda9a68aec28f4204ade54f245106d0e11",
        ABI,
        signer
      );
      setNFT(nft);

      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    } else {
      window.alert("Please connect Metamask wallet");
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <Router>
      <Navigation account={account} setAccount={setAccount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/AiNFT"
          element={<AiNFT signer={signer} provider={provider} nft={nft} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
