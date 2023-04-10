import React, { useState } from "react";

import axios from "axios";
import { NFTStorage } from "nft.storage";
import { Buffer } from "buffer";

//Import react components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

//Import api key
require("dotenv").config();

export function AiNFT({ signer, provider, nft }) {
  //Set State variables
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [viewMetadata, setViewMetadata] = useState(false);
  //State attribute variables for nft metadata
  const [trait0, setTrait0] = useState(null);
  const [value0, setValue0] = useState(null);
  const [trait1, setTrait1] = useState(null);
  const [value1, setValue1] = useState(null);
  const [trait2, setTrait2] = useState(null);
  const [value2, setValue2] = useState(null);
  const [trait3, setTrait3] = useState(null);
  const [value3, setValue3] = useState(null);
  const [trait4, setTrait4] = useState(null);
  const [value4, setValue4] = useState(null);
  const [trait5, setTrait5] = useState(null);
  const [value5, setValue5] = useState(null);

  const generateImage = async (e) => {
    e.preventDefault();

    if (prompt === "") {
      window.alert("Please provide a prompt");
      return;
    }
    createImage();
    setIsWaiting(true);
    setMessage("Generating image. This can take a minute...");
  };

  const manageImage = async (e) => {
    e.preventDefault();

    if (image === null || image === "") {
      window.alert("Generate an image before minting");
      return;
    }
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
        inputs: prompt,
        options: {
          // negative_prompt: [
          //   "Blurred",
          //   "Overexposed",
          //   "Underexposed",
          //   "Low contrast",
          //   "Noisy",
          //   "Unnatural colors",
          //   "Unbalanced composition",
          //   "Off-topic",
          //   "lowers",
          //   "error",
          //   "cropped",
          //   "worst quality",
          //   "low quality",
          //   "jpeg artifacts",
          //   "out of frame",
          //   "watermark",
          //   "signature",
          //   "deformed",
          //   "ugly",
          //   "mutilated",
          //   "disfigured",
          //   "bad proportions",
          //   "mutated hands",
          //   "poorly drawn face",
          // ],
          wait_for_model: true,
          num_inference_steps: 25,
          guidance_scale: 12,
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
      name: name,
      description: description,
      image: blob,
      attributes: [
        {
          trait_type: trait0,
          value: value0,
        },
        {
          trait_type: trait1,
          value: value1,
        },
        {
          trait_type: trait2,
          value: value2,
        },
        {
          trait_type: trait3,
          value: value3,
        },
        {
          trait_type: trait4,
          value: value4,
        },
        {
          trait_type: trait5,
          value: value5,
        },
      ],
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
      <Container>
        <div className="form-wrapper">
          <Form className="prompt-form">
            <Form.Label>
              <h1>Enter A Prompt</h1>
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                What makes a good{" "}
                <a href="https://stable-diffusion-art.com/prompt-guide/">
                  Prompt
                </a>
                ?
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
          </Form>
          <Form className="metadata-form">
            <Form.Label>
              <h1>Enter NFT Details</h1>
            </Form.Label>
            <Form.Group className="mb-2" controlId="formBasicNFTName">
              <Form.Text className="text-muted">
                List your Trait Type and description of that attribute. You must
                come up with all nine attributes! Read{" "}
                <a href="https://docs.opensea.io/docs/metadata-standards">
                  here
                </a>
                for more information about .
              </Form.Text>
              <Form.Control
                type="input"
                placeholder="NFT Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                Give your NFT a name.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicDescription">
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="NFT Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                Enter a description, mission, story, or message about your NFT.
              </Form.Text>
            </Form.Group>
            <Row className="att mb-2">
              <Form.Control
                type="input"
                placeholder="Trait Type"
                onChange={(e) => {
                  setTrait0(e.target.value);
                }}
              />
              <Form.Control
                type="input"
                placeholder="Value"
                onChange={(e) => {
                  setValue0(e.target.value);
                }}
              />
            </Row>
            <Row className="att mb-2">
              <Form.Control
                type="input"
                placeholder="Trait Type"
                onChange={(e) => {
                  setTrait1(e.target.value);
                }}
              />
              <Form.Control
                type="input"
                placeholder="Value"
                onChange={(e) => {
                  setValue1(e.target.value);
                }}
              />
            </Row>
            <Row className="att mb-2">
              <Form.Control
                type="input"
                placeholder="Trait Type"
                onChange={(e) => {
                  setTrait2(e.target.value);
                }}
              />
              <Form.Control
                type="input"
                placeholder="Value"
                onChange={(e) => {
                  setValue2(e.target.value);
                }}
              />
            </Row>
            <Row className="att mb-2">
              <Form.Control
                type="input"
                placeholder="Trait Type"
                onChange={(e) => {
                  setTrait3(e.target.value);
                }}
              />
              <Form.Control
                type="input"
                placeholder="Value"
                onChange={(e) => {
                  setValue3(e.target.value);
                }}
              />
            </Row>
            <Row className="att mb-2">
              <Form.Control
                type="input"
                placeholder="Trait Type"
                onChange={(e) => {
                  setTrait4(e.target.value);
                }}
              />
              <Form.Control
                type="input"
                placeholder="Value"
                onChange={(e) => {
                  setValue4(e.target.value);
                }}
              />
            </Row>
            <Row className="att mb-2">
              <Form.Control
                type="input"
                placeholder="Trait Type"
                onChange={(e) => {
                  setTrait5(e.target.value);
                }}
              />
              <Form.Control
                type="input"
                placeholder="Value"
                onChange={(e) => {
                  setValue5(e.target.value);
                }}
              />
            </Row>

            <Button
              variant="primary"
              className="btn mint-btn"
              onClick={(e) => manageImage(e)}
              type="submit"
            >
              Mint NFT
            </Button>
          </Form>
        </div>
        <div className="image-wrapper">
          <div className="generated-image">
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
          {viewMetadata && url ? (
            <p>
              View <a href={url}>Metadata</a>
            </p>
          ) : (
            <p>Metadata will be displayed here after creating a NFT!</p>
          )}
        </div>
      </Container>
    </>
  );
}
