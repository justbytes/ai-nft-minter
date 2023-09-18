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

const app = express();

const production = true;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Create a new instance of an Apollo server class with the GraphQL schema's typeDefs and resolvers as parameters

if (production) {
  const sslOptions = {
    cert: fs.readFileSync(`${process.env.CERT}`),
    key: fs.readFileSync(`${process.env.KEY}`),
  };
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
    httpsServer.listen(PORT, () => {
      console.log('Express server running on HTTPS port 443');
      console.log(
        `Use GraphQL at https://www.thenftgenie.co${server.graphqlPath}`
      );
    });
  };
  // Start Apollo Server
  startApolloServer(typeDefs, resolvers);
} else {
  const startApolloServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,
    });

    await server.start();

    // Connect Apollo Server to the Express app
    server.applyMiddleware({ app });

    // Start the Express app, which includes Apollo Server middleware
    const port = 3001;
    app.listen(port, () => {
      console.log(`Express server running on port ${port}`);
      console.log(
        `Use GraphQL at http://localhost:${port}${server.graphqlPath}`
      );
    });
  };
  // Start Apollo Server
  startApolloServer(typeDefs, resolvers);
}
