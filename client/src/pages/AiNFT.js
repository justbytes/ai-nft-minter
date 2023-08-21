import React, { useState } from 'react';
import fetch from 'node-fetch';

// Import react-bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

// Import NFT Genie logo picture
import profilePic from '../images/genie.jpeg';

export function AiNFT({ signer, provider, nft }) {
  // Intial values of the metadata fields
  const initialMetadata = {
    name: '',
    description: '',
    attributes: [
      { trait: '', value: '' },
      { trait: '', value: '' },
      { trait: '', value: '' },
      { trait: '', value: '' },
      { trait: '', value: '' },
      { trait: '', value: '' },
    ],
  };
  // Set State variables
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [url, setURL] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState('');
  const [viewMetadata, setViewMetadata] = useState(false);
  const [metadata, setMetadata] = useState(initialMetadata);

  // Updates state with users prompt
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleNameChange = (e) => {
    setMetadata({
      ...metadata,
      name: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setMetadata({
      ...metadata,
      description: e.target.value,
    });
  };

  const handleAttributeChange = (e, index, field) => {
    const updatedAttributes = [...metadata.attributes];
    updatedAttributes[index][field] = e.target.value;
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      attributes: updatedAttributes,
    }));
  };

  const handleImageGenerationClick = async (e) => {
    e.preventDefault();

    // Ensure user entered a prompt
    if (!prompt) {
      window.alert('Please provide a prompt!');
      return;
    }
    // API Call to Stable Diffusion
    try {
      // Setting the loading screen while image is being generated
      setIsWaiting(true);
      setMessage('Generating image. This can take a minute...');

      const response = await fetch('/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(
          `There was a problem generating the image. Request failed with status code ${response.status}`
        );
      }

      const result = await response.json();
      console.log(result);
      const imageUrl = result.output[0];

      setImage(imageUrl);
    } catch (error) {
      console.error(`Error when generating image: ${error}`);
    } finally {
      setIsWaiting(false);
      setMessage('');
    }
  };

  const handleMetadataClick = async (e) => {
    e.preventDefault();

    if (!image) {
      window.alert(
        'There is no image to mint! Please generate an image by writing a prompt and clicking `Generate Image`'
      );
    }
    // Upload Metadata and mint nft
    try {
      // Set loading screen while users image is being minted
      setIsWaiting(true);
      setMessage('Minting your image please wait. This can take a minute...');

      // Upload metadata to ipfs
      try {
        const response = await fetch('/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image, metadata }),
        });

        if (!response.ok) {
          throw new Error(
            `There was a problem uploading metadat to ipfs. Request failed with status code ${response.status}`
          );
        }

        const result = await response.json();
        setURL(result.url);
        // Display link to metadata
        setViewMetadata(true);
      } catch (error) {
        console.error(
          `There was an error uploading metadata to ipfs. ERROR ${error}`
        );
      }

      // Mint NFT
      try {
        const signer = await provider.getSigner();
        const nftWithSigner = nft.connect(signer);
        const tx = await nftWithSigner.mint(url);
        await tx.wait();
      } catch (error) {
        console.error(`There was an error minting the NFT. ERROR ${error}`);
      }
    } catch (error) {
      console.error(
        `There was a problem in the process of uploading and or minting nft. ERROR: ${error}`
      );
    } finally {
      setIsWaiting(false);
      setImage(image);
    }
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
                  onChange={handlePromptChange}
                />
                <Form.Text>
                  What makes a good{' '}
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
                onClick={handleImageGenerationClick}
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
                  click{' '}
                  <a
                    className="link"
                    href="https://docs.opensea.io/docs/metadata-standards"
                  >
                    HERE
                  </a>{' '}
                  to learn more.
                </Form.Text>
                <Form.Control
                  type="input"
                  placeholder="NFT Name"
                  value={metadata.name}
                  onChange={handleNameChange}
                />
                <Form.Text>Give your NFT a name.</Form.Text>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicDescription">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="NFT Description"
                  value={metadata.description || ''}
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
                    value={attribute.trait || ''}
                    onChange={(e) => handleAttributeChange(e, index, 'trait')}
                  />
                  <Form.Control
                    type="input"
                    placeholder="Value"
                    value={attribute.value || ''}
                    onChange={(e) => handleAttributeChange(e, index, 'value')}
                  />
                </div>
              ))}
              <Button
                onClick={handleMetadataClick}
                variant="primary"
                className="btn mint-btn"
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
              View{' '}
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
