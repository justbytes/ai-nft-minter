import React from 'react';

import { Card, CardBody, CardTitle3 } from '../StyledComponents/Cards';
import { Paragragh } from '../StyledComponents/Paragraphs';
import { StyledLink } from '../StyledComponents/Links';

const Instructions = () => {
  return (
    <Card $secondary $width="62%" $padding="15px" $height="30rem">
      <CardTitle3 $padding="10px">
        Steps to creating a NFT with NFT Genie:
      </CardTitle3>
      <CardBody $lineHeight="2.5rem" $padding="10px">
        <Paragragh>
          1. Connect Metamask via MetaMask browser extension.
        </Paragragh>
        <Paragragh>
          2. Configure your MetaMask wallet to use the Goerli Testnet and get
          WETH from a{' '}
          <StyledLink link="https://goerlifaucet.com/">faucet</StyledLink>{' '}
        </Paragragh>

        <Paragragh>
          3. Connect your Metamask wallet by clicking the connect button in the
          top right corner.
        </Paragragh>
        <Paragragh>
          4. Enter a prompt in the prompt field until you get a image you like.
          Read{' '}
          <StyledLink link="https://stable-diffusion-art.com/prompt-guide/">
            HERE
          </StyledLink>{' '}
          if you want to know what makes a good prompt.
        </Paragragh>

        <Paragragh>
          5. Give the image a Name, Description, and up to six attributes.
        </Paragragh>
        <Paragragh>
          6. Click mint image which will then open MetaMask which will prompt
          you to sign the transaction.
        </Paragragh>
        <Paragragh>
          7. Go to <StyledLink link="https://opensea.io/">OpenSea</StyledLink> ,
          connect your MetaMask wallet, navigate to your profile and you will be
          able to view your NFT!
        </Paragragh>
      </CardBody>
    </Card>
  );
};

export default Instructions;
