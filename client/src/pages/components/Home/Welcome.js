import React from 'react';

import Auth from '../../../utils/auth';

import {
  FlexCard,
  BottomBorderCardBody,
  CardFooter,
} from '../StyledComponents/Cards';
import { CenteredParagragh } from '../StyledComponents/Paragraphs';
import { StyledLink, ButtonLink } from '../StyledComponents/Links';

const Welcome = () => {
  return (
    <FlexCard $padding="15px" $width="90%">
      <BottomBorderCardBody>
        <CenteredParagragh>
          Welcome to NFT Genie, where you can create NFTs in just minutes. NFT
          Genie makes this possible by using the dreaded ARTIFICIAL
          INTELLIGENCE, but more specifically it uses Stable Diffusion
          text-to-image generator. After following the steps below you will have
          minted your image into an NFT that is 100% yours for FREE (except for
          gas fees). Then head over to the NFT Marketplace{' '}
          <StyledLink $color="orange" link="https://opensea.io/">
            OpenSea
          </StyledLink>{' '}
          to list, share, and admire your creation. If you like NFT Genie please
          join our Discord and share your creations! Currently NFTs will be
          minted to the Goerli Test Network.
        </CenteredParagragh>
      </BottomBorderCardBody>
      <CardFooter $padding="5px">
        <CenteredParagragh>Login to start minting.</CenteredParagragh>
        <ButtonLink $padding="5px" $width="6%" link="/login">
          Login
        </ButtonLink>
      </CardFooter>
    </FlexCard>
  );
};

export default Welcome;
