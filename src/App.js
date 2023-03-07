import React, { useState, useEffect } from "react";

//Import react components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//Import navbar
import Navbar from "./components/Navbar";

//Import styling
import "./style/App.css";

function App() {
  const [account, setAccount] = useState("");
  const [image, setImage] = useState(null);
  return (
    <>
      <Navbar account={account} setAccount={setAccount} />
      <div className="nft-wrapper">
        <Form className="generate-image">
          <Form.Group className="mb-2" controlId="formBasicNFTName">
            <Form.Control type="input" placeholder="NFT Name" />
            <Form.Text className="text-muted">Give your NFT a name.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicDescription">
            <Form.Control type="input" placeholder="NFT Description" />
            <Form.Text className="text-muted">
              Enter a description for the AI NFT generator
            </Form.Text>
          </Form.Group>
          <Button variant="primary" className="btn generate-btn" type="submit">
            Generate Image
          </Button>
          <Button variant="primary" className="btn mint-btn" type="submit">
            Mint NFT
          </Button>
        </Form>
        <div className="image">
          <img src={image} alt="AI Generated Image" />
        </div>
      </div>
    </>
  );
}

export default App;
