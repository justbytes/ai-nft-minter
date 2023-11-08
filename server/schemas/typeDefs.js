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
    image_archive: [GeneratedImage]
    nft_archive: [Nft]
  }

  type GeneratedImage {
    image: String!
    prompt: String!
  }

  type Nft {
    name: String!
    description: String
    image: String!
    attributes: [NftAttribute]
  }

  type NftAttribute {
    trait: String
    value: String
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
