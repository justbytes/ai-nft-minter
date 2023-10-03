const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    images_generated: Int
    nfts_minted: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(
      firstname: String!
      lastname: String!
      username: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
