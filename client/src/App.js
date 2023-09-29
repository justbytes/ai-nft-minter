import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { LoggedInProvider } from './LoggedInProvider';

// Import pages
import { Navigation } from './pages/components/Navigation';
import { Footer } from './pages/components/Footer';
import { Home } from './pages/Home';
import { CreateNft } from './pages/CreateNft';
import { Login } from './pages/Login';

// Load blockchain data
import { BlockchainData } from './BlockchainData';

const token = localStorage.getItem('id_token');

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
});

console.log('client', client);

function App() {
  const { account, setAccount, provider, nftContract } = BlockchainData();

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <LoggedInProvider>
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
          </LoggedInProvider>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
