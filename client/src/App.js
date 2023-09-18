import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import { Navigation } from './pages/components/Navigation';
import { Footer } from './pages/components/Footer';
import { Home } from './pages/Home';
import { CreateNft } from './pages/CreateNft';
import { Login } from './pages/Login';

// Load blockchain data
import { BlockchainData } from './BlockchainData';

function App() {
  const { account, setAccount, provider, nftContract } = BlockchainData();

  return (
    <>
      <Router>
        <Navigation account={account} setAccount={setAccount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/createNft"
            element={
              <CreateNft nftContract={nftContract} provider={provider} />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
