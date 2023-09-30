require('dotenv').config();
const express = require('express');
const https = require('https');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const router = require('./controllers');
const cors = require('cors');
const fs = require('fs');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: 'https://thenftgenie.co',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

// Create a new instance of an Apollo server class with the GraphQL schema's typeDefs and resolvers as parameters
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();

  // Connect Apollo Server to the Express app
  server.applyMiddleware({ app, path: '/graphql' });

  // Start the Express app, which includes Apollo Server middleware
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start Apollo Server
startApolloServer();
