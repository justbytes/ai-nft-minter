import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { onError } from '@apollo/client/link/error';

import { LoggedInProvider } from './LoggedInProvider';

// Import pages
import { Navigation } from './pages/components/Navigation';
import { Footer } from './pages/components/Footer';
import { Home } from './pages/Home';
import { CreateNft } from './pages/CreateNft';
import { Login } from './pages/Login';

// Load blockchain data
import { BlockchainData } from './BlockchainData';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// setting the token in the client req headers
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// eslint-disable-next-line
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

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
