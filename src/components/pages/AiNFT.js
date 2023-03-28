import React, { useState } from "react";

import axios from "axios";
import { NFTStorage } from "nft.storage";
import { Buffer } from "buffer";

//Import react components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

//Import api key
require("dotenv").config();

export function AiNFT({ signer, provider, nft }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [viewMetadata, setViewMetadata] = useState(false);

  const generateImage = async (e) => {
    e.preventDefault();

    if (name === "" || description === "") {
      window.alert("Please provide a name and description");
      return;
    }
    createImage();
    setIsWaiting(true);
    setMessage("Generating image please wait...");
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
          negative_prompt: [
            "Blurred",
            "Overexposed",
            "Underexposed",
            "Low contrast",
            "Noisy",
            "Unnatural colors",
            "Unbalanced composition",
            "Off-topic",
            "lowers",
            "error",
            "cropped",
            "worst quality",
            "low quality",
            "jpeg artifacts",
            "out of frame",
            "watermark",
            "signature",
            "photorealistic",
            "deformed",
            "ugly",
            "mutilated",
            "disfigured",
            "bad proportions",
            "mutated hands",
            "poorly drawn face",
          ],
          wait_for_model: true,
          num_inference_steps: 25,
          guidance_scale: 10,
          manual_seed: 2,
        },
      }),
      responseType: "arraybuffer",
    });

    const type = response.headers["content-type"];
    const data = response.data;

    const base64data = Buffer.from(data).toString("base64");
    const img = `data:${type};base64,` + base64data; // <-- This is so we can render it on the page
    await setImage(img);
    setIsWaiting(false);
    setMessage("");
  };

  const uploadImage = async () => {
    console.log("loading...");
    // Create instance to NFT.Storage
    const nftstorage = new NFTStorage({
      token: process.env.REACT_APP_NFTSTORAGE,
    });

    const blob = await (await fetch(image)).blob();
    const imageHash = await nftstorage.storeBlob(blob);
    console.log("Image Hash:", blob);

    const { ipnft } = await nftstorage.store({
      image: blob,
      name: name,
      description: description,
    });

    // Save the URL
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setURL(url);
    console.log(url);

    mintImage(url);
    setViewMetadata(true);
  };

  const mintImage = async (url) => {
    console.log(url);
    const signer = await provider.getSigner();
    const nftWithSigner = nft.connect(signer);
    const tx = await nftWithSigner.mint(url);
    await tx.wait();
  };

  return (
    <>
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
          {!isWaiting && image ? (
            <img src={image} alt="AI Generated Image" />
          ) : isWaiting ? (
            <div className="image-placeholder">
              <Spinner animation="border" />
              <p>{message}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        {viewMetadata && url ? (
          <p>
            View <a href={url}>Metadata</a>
          </p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
