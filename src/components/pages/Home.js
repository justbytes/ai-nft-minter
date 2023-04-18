import React from "react";

// Import react-bootstrap components
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//Import NFT Genie logo image
import profilePic from "../../images/genie.jpeg";

export function Home() {
  return (
    <>
      <h1 className="mainH1">Welcome to NFT Genie</h1>
      <div className="background">
        <Card className="mb-2 homeCard">
          <Card.Body>
            <h3>How it works</h3>
            <p>
              Welcome to NFT Genie, where you can create NFTs in just minutes.
              NFT Genie makes this possible by using the dreaded ARTIFICIAL
              INTELLIGENCE, but more specifically it uses Stable Diffusion
              text-to-image generator. After following the steps below you will
              have minted your image into an NFT that is 100% yours for FREE
              (expect for gas fees). Then head over to the NFT Marketplace{" "}
              <a className="link" href="https://opensea.io/">
                OpenSea
              </a>{" "}
              to list, share, and admire your creation. If you like NFT Genie
              please join our Discord and share your creations!
              <br />
              <br />
              <span className="steps">
                Steps to creating a NFT with NFT Genie:
              </span>
              <br />
              1. Connect your MetaMask Wallet.
              <br />
              <br />
              2. Create a prompt. Read{" "}
              <a
                className="link"
                href="https://stable-diffusion-art.com/prompt-guide/"
              >
                HERE
              </a>{" "}
              if you want to know what makes a good prompt.
              <br />
              <br />
              3. Create your metadata. Give the NFT a name, description, and
              attributes.
              <br />
              <br />
              4. Click 'Mint NFT' pay the gas fee and you're set!
            </p>
          </Card.Body>
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
            <Card.Body>
              <Card.Title>
                <h3>Are you ready?</h3>
              </Card.Title>
              <Card.Text>
                To use NFT Genie you will need to have the MetaMask extension
                installed. Please follow this{" "}
                <a
                  className="link"
                  href="https://medium.com/bankless-dao/how-to-set-up-a-metamask-wallet-a2cc255bafe2"
                >
                  guide
                </a>{" "}
                if you need help setting up your MetaMask Wallet.
                <br />
                <br />
                Please read the conditions of use from Stable Diffusion{" "}
                <a
                  className="link"
                  href="https://huggingface.co/spaces/CompVis/stable-diffusion-license"
                >
                  here
                </a>{" "}
                before using NFT Genie.
              </Card.Text>
              <Button type className="project-btn" href="#/aiNFT">
                Lets Go!
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
