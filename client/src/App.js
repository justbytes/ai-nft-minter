import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import { Navigation } from './pages/components/Navigation';
import { Footer } from './pages/components/Footer';
import { Home } from './pages/Home';
import { AiNFT } from './pages/AiNFT';

// Load blockchain data
import { BlockchainData } from './pages/components/BlockchainData';

// Import styling
import './style/App.css';

function App() {
  const { account, setAccount, provider, signer, nftContract } =
    BlockchainData();

  return (
    <Router>
      <Navigation account={account} setAccount={setAccount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/AiNFT"
          element={
            <AiNFT
              nftContract={nftContract}
              provider={provider}
              signer={signer}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
