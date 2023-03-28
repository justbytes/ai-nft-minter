import React from "react";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import profilePic from "../../images/genie.jpeg";

export function Home() {
  return (
    <>
      <div className="background">
        <h1>NFT Genie</h1>
        <Card text="dark" className="mb-2 homeCard">
          <Card.Body>
            <Card.Title>Welcome </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="additionals">
        <div className="picture">
          <Figure className="pictureFigure">
            <Figure.Image
              width={350}
              height={450}
              alt="171x180"
              src={profilePic}
            />
            <Figure.Caption>
              Unlimited prompts to make your wishes come true.
            </Figure.Caption>
          </Figure>
        </div>
        <div className="project">
          <Card text="dark" className="mb-2 projectCard">
            <Card.Body>
              <Card.Title>Are you ready? </Card.Title>
              <Card.Text>
                If you have a Metamask Wallet ready then lets make some NFT's
                <Button href="#/aiNFT">Lets Go!</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
