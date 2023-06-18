import React from 'react';

// Import react-bootstrap components
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Import NFT Genie logo image
import profilePic from '../../images/genie.jpeg';

export function Home() {
  return (
    <>
      <h1 className="mainH1">Welcome to NFT Genie</h1>
      <div className="background">
        <Card className="mb-2 homeCard">
          <div className="text-bg">
            <Card.Body>
              <h3>How it works</h3>
              <p>
                Welcome to NFT Genie, where you can create NFTs in just minutes.
                NFT Genie makes this possible by using the dreaded ARTIFICIAL
                INTELLIGENCE, but more specifically it uses Stable Diffusion
                text-to-image generator. After following the steps below you
                will have minted your image into an NFT that is 100% yours for
                FREE (except for gas fees). Then head over to the NFT
                Marketplace{' '}
                <a className="link" href="https://opensea.io/">
                  OpenSea
                </a>{' '}
                to list, share, and admire your creation. If you like NFT Genie
                please join our Discord and share your creations! Currently NFTs
                will be minted to the Goerli Test Network.
                <br />
                <br />
                <span className="steps">
                  Steps to creating a NFT with NFT Genie:
                </span>
                <br />
                1. Connect Metamask via MetaMask browser extension.
                <br />
                <br />
                2. Configure your MetaMask wallet to use the Goerli Testnet and
                get WETH from a{' '}
                <a className="link" href="https://goerlifaucet.com/">
                  faucet
                </a>{' '}
                .
                <br />
                <br />
                3. Connect your Metamask wallet by clicking the connect button
                in the top right corner.
                <br />
                <br />
                4. Enter a prompt in the prompt field until you get a image you
                like. Read{' '}
                <a
                  className="link"
                  href="https://stable-diffusion-art.com/prompt-guide/"
                >
                  HERE
                </a>{' '}
                if you want to know what makes a good prompt.
                <br />
                <br />
                5. Give the image a Name, Description, and up to six attributes.
                <br />
                <br />
                6. Click mint image which will then open MetaMask which will
                prompt you to sign the transaction.
                <br />
                <br />
                7. Go to{' '}
                <a className="link" href="https://opensea.io/">
                  OpenSea
                </a>{' '}
                , connect your MetaMask wallet, navigate to your profile and you
                will be able to view your NFT!
              </p>
            </Card.Body>
          </div>
        </Card>
      </div>
      <div className="figs">
        <div className="picture">
          <Figure className="pictureFigure">
            <Figure.Image
              width={400}
              height={450}
              alt="171x180"
              src={profilePic}
            />
            <Figure.Caption className="fig-caption">
              Unlimited prompts to make your wishes come true.
            </Figure.Caption>
          </Figure>
        </div>
        <div className="project">
          <Card className="mb-2 projectCard">
            <div className="text-bg">
              <Card.Body>
                <Card.Title>
                  <h3>Are you ready?</h3>
                </Card.Title>
                <Card.Text>
                  To use NFT Genie you will need to have the MetaMask extension
                  installed. Please follow this{' '}
                  <a
                    className="link"
                    href="https://medium.com/bankless-dao/how-to-set-up-a-metamask-wallet-a2cc255bafe2"
                  >
                    GUIDE
                  </a>{' '}
                  if you need help setting up your MetaMask Wallet.
                  <br />
                  Then configure your wallet to utilize the Goerli Testnet and
                  grab some fake ETH{' '}
                  <a href="https://goerlifaucet.com/" className="link">
                    HERE
                  </a>
                  <br />
                  <br />
                  Please read the conditions of use from Stable Diffusion{' '}
                  <a
                    className="link"
                    href="https://huggingface.co/spaces/CompVis/stable-diffusion-license"
                  >
                    HERE
                  </a>{' '}
                  before using NFT Genie.
                </Card.Text>
                <Button type className="project-btn" href="#/aiNFT">
                  Lets Go!
                </Button>
              </Card.Body>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
