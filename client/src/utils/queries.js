import { gql } from '@apollo/client';

export const USER_INFO = gql`
  query getMe {
    me {
      _id
      email
      firstname
      lastname
      username
      images_generated
      nfts_minted
      image_archive {
        image
        prompt
      }
      nft_archive {
        name
        description
        image
        attributes {
          trait
          value
        }
      }
    }
  }
`;
