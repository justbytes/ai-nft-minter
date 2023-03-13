import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { NFTStorage } from "nft.storage";
import { Buffer } from "buffer";

import ABI from "./abi/NFT.json";

//Import react components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//Import navbar
import Navbar from "./components/Navbar";

//Import styling
import "./style/App.css";

//Import api key
require("dotenv").config();

function App() {
  const [provider, setProvider] = useState("");
  const [signer, setSigner] = useState("");
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [nft, setNFT] = useState(null);

  console.log(name, description);

  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);

      const network = await provider.getNetwork();

      const nft = new ethers.Contract(
        "0x5a5fe2dda9a68aec28f4204ade54f245106d0e11",
        ABI,
        signer
      );
      setNFT(nft);

      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    }
  };

  const generateImage = async (e) => {
    e.preventDefault();

    if (name === "" || description === "") {
      window.alert("Please provide a name and description");
      return;
    }
    setImageData(createImage());
  };

  const manageImage = async (e) => {
    e.preventDefault();

    if (image === null) {
      window.alert("Generate an image before minting");
      return;
    }
    console.log("loading manage image");
    uploadImage();
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
    console.log(data);
    return data;
  };

  const uploadImage = async () => {
    console.log("loading");

    const nftStorage = new NFTStorage({
      token: process.env.REACT_APP_NFTSTORAGE,
    });

    const { ipnft } = await nftStorage.store({
      image: new File([generateImage.imageData], "image.jpeg", {
        type: "image/jpeg",
      }),
      name: name,
      description: description,
    });
    console.log(ipnft);
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setURL(url);
    mintImage(url);
  };

  const mintImage = async (url) => {
    console.log(url);
    // const signer = await provider.getSigner();
    // const nftWithSigner = nft.connect(signer);
    // const tx = await nftWithSigner.mint(url);
    // await tx.wait();
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

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
          <Button
            variant="primary"
            className="btn mint-btn"
            onClick={(e) => manageImage(e)}
            type="submit"
          >
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
