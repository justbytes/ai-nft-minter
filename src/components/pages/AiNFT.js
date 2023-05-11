import React, { useCallback, useState } from "react";
import axios from "axios";
import { NFTStorage } from "nft.storage";
import { Buffer } from "buffer";

// Import react-bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

// Import NFT Genie logo picture
import profilePic from "../../images/genie.jpeg";

export function AiNFT({ signer, provider, nft }) {
  // Set State variables
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [viewMetadata, setViewMetadata] = useState(false);
  // State attribute variables for nft metadata

  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    attributes: [
      { trait: "", value: "" },
      { trait: "", value: "" },
      { trait: "", value: "" },
      { trait: "", value: "" },
      { trait: "", value: "" },
      { trait: "", value: "" },
    ],
  });

  const handlePromptChange = useCallback((e) => {
    setPrompt(e.target.value);
  }, []);

  const handleInputChange = useCallback(
    (e, index, field) => {
      const updatedAttributes = [...metadata.attributes];
      updatedAttributes[index][field] = e.target.value;
      setMetadata((prevMetadata) => ({
        ...prevMetadata,
        attributes: updatedAttributes,
      }));
    },
    [metadata.attributes]
  );

  const handleNameChange = useCallback((e) => {
    setMetadata((prevMetadata) => ({ ...prevMetadata, name: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      description: e.target.value,
    }));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (prompt === "") {
      window.alert("Please provide a prompt");
      return;
    }

    // Start API call
    manageImage();
    // Set isWaiting to true to enable loading screen with bootstrap spinner
    setIsWaiting(true);
    setMessage("Minting your image please wait. This can take a minute...");
  };

  const handlePromptSubmit = async (e) => (e) => {
    e.preventDefault();
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
  async function manageImage() {
    // Conditional ensuring image has been generated
    if (image === null || image === "") {
      window.alert("Generate an image before minting");
      return;
    }
    // Begin NFTStorage API call
    uploadImage();
  }

  // Generate Stable diffusion AI image
  async function createImage() {
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
    setImage(img);
    setIsWaiting(false);
    setMessage("");
  }

  const uploadImage = async () => {
    console.log("loading...");
    // Create instance to NFT.Storage
    const nftstorage = new NFTStorage({
      token: process.env.REACT_APP_NFTSTORAGE,
    });
    // Convert image to blob so it can be uploaded to IPFS
    const blob = await (await fetch(image)).blob();
    const imageHash = await nftstorage.storeBlob(blob);
    console.log("Image Hash:", imageHash);

    const attributes = metadata.attributes.map(({ trait, value }) => ({
      trait_type: trait,
      value: value,
    }));
    const metadataObj = {
      name: metadata.name,
      description: metadata.description,
      image: blob,
      attributes: attributes,
    };
    // Create NFT metadata with name, description, image, and attributes
    const { ipnft } = await nftstorage.store(metadataObj);
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
    setIsWaiting(false);
    setImage(image);
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="form-wrapper">
          <Form onSubmit={handlePromptSubmit} className="prompt-form">
            <div className="gen-text-bg">
              <Form.Label>
                <h1 className="prompt-h1">Enter Prompt</h1>
              </Form.Label>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handlePromptChange}
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
                // onClick={(e) => generateImage(e)}
                type="submit"
              >
                Generate Image
              </Button>
            </div>
          </Form>
          <Form className="metadata-form" onSubmit={handleFormSubmit}>
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
                  value={metadata.name || ""}
                  onChange={handleNameChange}
                />
                <Form.Text>Give your NFT a name.</Form.Text>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicDescription">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="NFT Description"
                  value={metadata.description || ""}
                  onChange={handleDescriptionChange}
                />
                <Form.Text>
                  Enter a description, mission, story, or message about your
                  NFT.
                </Form.Text>
              </Form.Group>
              {metadata.attributes.map((attribute, index) => (
                <div className="att mb-2" key={index}>
                  <Form.Control
                    type="input"
                    placeholder="Trait Type"
                    value={attribute.trait || ""}
                    onChange={(e) => handleInputChange(e, index, "trait")}
                  />
                  <Form.Control
                    type="input"
                    placeholder="Value"
                    value={attribute.value || ""}
                    onChange={(e) => handleInputChange(e, index, "value")}
                  />
                </div>
              ))}
              <Button variant="primary" className="btn mint-btn" type="submit">
                Mint NFT
              </Button>
            </div>
          </Form>
        </div>
        <div className="image-wrapper">
          <div className="generated-image">
            {!isWaiting && image ? (
              <img src={image} alt="AI Generated" />
            ) : isWaiting ? (
              <div className="image-placeholder">
                <Spinner animation="border" />
                <p>{message}</p>
              </div>
            ) : !isWaiting ? (
              <img src={profilePic} alt="NFT Genie" />
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
