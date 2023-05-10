import React, { useState } from "react";
import axios from "axios";
import { NFTStorage } from "nft.storage";
import { Buffer } from "buffer";

// Import react-bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// Import NFT Genie logo picture
import profilePic from "../../images/genie.jpeg";

// Import api keys
// require("dotenv").config();

export function AiNFT({ signer, provider, nft }) {
  // Set State variables
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [viewMetadata, setViewMetadata] = useState(false);
  // State attribute variables for nft metadata
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

  // On click generate image
  const generateImage = async (e) => {
    e.preventDefault();
    // Display if user failed to enter prompt
    if (prompt === "") {
      window.alert("Please provide a prompt");
      return;
    }
    // Start API call
    createImage();
    // Set isWaiting to true to enable loading screen with bootstrap spinner
    setIsWaiting(true);
    setMessage("Generating image. This can take a minute...");
  };

  // On click upload image to IPFS and Mint
  const manageImage = async (e) => {
    e.preventDefault();
    // Conditional ensuring image has been generated
    if (image === null || image === "") {
      window.alert("Generate an image before minting");
      return;
    }
    // Begin NFTStorage API call
    uploadImage();
  };

  // Generate Stable diffusion AI image
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
      //set options for stable diffusion
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
    // Convert image to blob so it can be uploaded to IPFS
    const blob = await (await fetch(image)).blob();
    const imageHash = await nftstorage.storeBlob(blob);
    console.log("Image Hash:", blob);
    // Create NFT metadata with name, description, image, and attributes
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
    // Set new URL
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setURL(url);
    console.log(url);
    // Pass url to mint image function
    mintImage(url);
    // Display link to metadata
    setViewMetadata(true);
  };

  // Mint image/metadata into NFT
  const mintImage = async (url) => {
    const signer = await provider.getSigner();
    const nftWithSigner = nft.connect(signer);
    const tx = await nftWithSigner.mint(url);
    await tx.wait();
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="form-wrapper">
          <Form className="prompt-form">
            <div className="gen-text-bg">
              <Form.Label>
                <h1 className="prompt-h1">Enter Prompt</h1>
              </Form.Label>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                  }}
                />
                <Form.Text>
                  What makes a good{" "}
                  <a
                    className="link"
                    href="https://stable-diffusion-art.com/prompt-guide/"
                  >
                    PROMPT
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
            </div>
          </Form>
          <Form className="metadata-form">
            <div className="gen-text-bg">
              <Form.Label>
                <h1 className="metadata-h1">Enter Metadata</h1>
              </Form.Label>
              <Form.Group className="mb-2" controlId="formBasicNFTName">
                <Form.Text>
                  In this section you will name your NFT, give it a description,
                  and add 6 attributes! If you need some help with this part
                  click{" "}
                  <a
                    className="link"
                    href="https://docs.opensea.io/docs/metadata-standards"
                  >
                    HERE
                  </a>{" "}
                  to learn more.
                </Form.Text>
                <Form.Control
                  type="input"
                  placeholder="NFT Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Form.Text>Give your NFT a name.</Form.Text>
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
                <Form.Text>
                  Enter a description, mission, story, or message about your
                  NFT.
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
            </div>
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
            ) : !isWaiting ? (
              <img src={profilePic} alt="NFT Genie Picture" />
            ) : (
              <></>
            )}
          </div>
          {viewMetadata && url ? (
            <p className="metadata-link">
              View{" "}
              <a className="link" href={url}>
                Metadata
              </a>
            </p>
          ) : (
            <p className="metadata-link">
              Metadata will be displayed here after creating a NFT!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
