import React, { useState, useEffect } from "react";
import axios from "axios";

//Import react components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//Import navbar
import Navbar from "./components/Navbar";

//Import styling
import "./style/App.css";
require("dotenv").config();

function App() {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);

  console.log(name, description);

  const generateImage = (e) => {
    e.preventDefault();

    if (name === "" || description === "") {
      window.alert("Please provide a name and description");
      return;
    }
    createImage();
  };

  const createImage = async () => {
    console.log("generating...");
    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

    // Send the request
    const response = await axios({
      url: URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        inputs: description,
        options: {
          wait_for_model: true,
          height: 480,
          width: 480,
          num_inference_steps: 200,
          guidance_scale: 5,
        },
      }),
      responseType: "arraybuffer",
    });

    const type = response.headers["content-type"];
    const data = response.data;

    const base64data = Buffer.from(data).toString("base64");
    const img = `data:${type};base64,` + base64data; // <-- This is so we can render it on the page
    setImage(img);

    return data;
    console.log(data);
  };

  return (
    <>
      <Navbar account={account} setAccount={setAccount} />
      <div className="nft-wrapper">
        <Form className="generate-image">
          <Form.Group className="mb-2" controlId="formBasicNFTName">
            <Form.Control
              type="input"
              placeholder="NFT Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Form.Text className="text-muted">Give your NFT a name.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicDescription">
            <Form.Control
              type="input"
              placeholder="NFT Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter a description for the AI NFT generator
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            className="btn generate-btn"
            onClick={(e) => generateImage(e)}
            type="submit"
          >
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
