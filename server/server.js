const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const router = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

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

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Start Apollo Server
startApolloServer(typeDefs, resolvers);
