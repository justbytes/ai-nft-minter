import { gql, useQuery } from '@apollo/client';

export const USER_INFO = gql`
  query getMe {
    me {
      _id
      email
      firstname
      lastname
      username
    }
  }
`;
