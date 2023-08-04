require('dotenv').config();
const express = require('express');
const https = require('https');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const router = require('./controllers');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const sslOptions = {
  cert: fs.readFileSync(`/home/ubuntu/secure/certificate.crt`),
  key: fs.readFileSync(`/home/ubuntu/secure/private.key`),
};
// Create a new instance of an Apollo server class with the GraphQL schema's typeDefs and resolvers as parameters
const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();
  // connect express app with apollo middleware
  server.applyMiddleware({ app });

  const httpsServer = https.createServer(sslOptions, app);

  // Start the HTTPS server on port 443
  httpsServer.listen(443, () => {
    console.log('Express server running on HTTPS port 443');
    console.log(
      `Use GraphQL at https://www.thenftgenie.co${server.graphqlPath}`
    );
  });
};

// Start Apollo Server
startApolloServer(typeDefs, resolvers);
