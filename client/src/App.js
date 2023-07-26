import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';

// Import pages
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { AiNFT } from './components/pages/AiNFT';

// Import contract ABI
import ABI from './abi/NFT.json';

// Import styling
import './style/App.css';

function App() {
  // Set state variables
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState('');
  const [signer, setSigner] = useState('');
  const [nft, setNFT] = useState(null);

  // Memoize values
  const providerValue = useMemo(
    () => ({ provider, signer }),
    [provider, signer]
  );
  const nftValue = useMemo(() => ({ nft, signer }), [nft, signer]);

  // Connect front end to blockchain
  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log(window.ethereum);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);

      await provider.getNetwork();

      const nft = new ethers.Contract(
        '0x5a5fe2dda9a68aec28f4204ade54f245106d0e11',
        ABI,
        signer
      );
      setNFT(nft);

      // Get first account in MetaMask
      const accounts = await provider.listAccounts();
      console.log(`App.js accounts: ${accounts}`);
      setAccount(accounts[0]);
    } else {
      window.alert('Please connect Metamask wallet');
    }

    function logObject(obj) {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          console.log(`Property: ${key}`);
          logObject(obj[key]);
        } else {
          console.log(`Property: ${key}, Value: ${obj[key]}`);
        }
      }
    }
    console.log('provider:');
    logObject(provider);
    console.log('signer:');
    logObject(signer);
    console.log('nft:');
    logObject(nft);
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
          element={<AiNFT {...nftValue} {...providerValue} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;