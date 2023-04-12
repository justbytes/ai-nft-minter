import React from "react";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
              Welcome to NFT Genie, where you can unleash your creativity and
              bring your digital creations to life in just minutes! With our
              user-friendly Stable Diffusion text-to-image generator, you can
              easily generate stunning visuals by simply typing in a prompt.
              Once you find the perfect image, simply click the 'Mint NFT'
              button to upload it to IPFS, pay the gas fee, and voila! You've
              just created your very own unique NFT. And the best part? You can
              show off your masterpiece on Open Sea and potentially earn some
              cash.
            </p>
          </Card.Body>
        </Card>
      </div>
      <div className="additionals">
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
                <a href="https://medium.com/bankless-dao/how-to-set-up-a-metamask-wallet-a2cc255bafe2">
                  guide
                </a>{" "}
                if you need help setting up your MetaMask Wallet.
                <br />
                <br />
                Please read the conditions of use from Stable Diffusion{" "}
                <a href="https://huggingface.co/spaces/CompVis/stable-diffusion-license">
                  here
                </a>{" "}
                before using NFT Genie.
              </Card.Text>
              <Button href="#/aiNFT">Lets Go!</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
