import React, { useState, useContext } from 'react';
import fetch from 'node-fetch';

import WaitingContext from './ContentProviders/WaitingProvider';
import ImageContext from './ContentProviders/ImageProvider';
import MetadataHashContext from './ContentProviders/MetadataProvider';

import {
  CenteredBody,
  FormTitle,
  SubBody,
  AttributeBody,
} from '../StyledComponents/Forms';
import { CenteredParagragh } from '../StyledComponents/Paragraphs';
import { StyledLink } from '../StyledComponents/Links';
import { Input } from '../StyledComponents/Inputs';
import { Button } from '../StyledComponents/Buttons';

const MetadataField = ({ user, setUser, provider, nftContract }) => {
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
  const { setWaiting } = useContext(WaitingContext);
  const { image, setImage } = useContext(ImageContext);
  const { setMetadataHash } = useContext(MetadataHashContext);
  const [metadata, setMetadata] = useState(initialMetadata);

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

  const handleMetadataClick = async (e) => {
    e.preventDefault();

    if (!image) {
      window.alert(
        'There is no image to mint! Please generate an image by writing a prompt and clicking `Generate Image`'
      );
    }

    // Upload Metadata and mint nft
    try {
      let nftHash;
      // Set loading screen while users image is being minted
      setWaiting(true);

      // Upload metadata to ipfs
      try {
        const response = await fetch('/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image, metadata, userId: user._id }),
        });
        if (!response.ok) {
          throw new Error(
            `There was a problem uploading metadat to ipfs. Request failed with status code ${response.status}`
          );
        }
        const result = await response.json();
        nftHash = result.url;
        setMetadataHash(nftHash);
      } catch (error) {
        console.error(
          `There was an error uploading metadata to ipfs. ERROR ${error}`
        );
      }

      // Mint NFT
      try {
        const nftSigner = await provider.getSigner();
        const nftWithSigner = await nftContract.connect(nftSigner);
        const tx = await nftWithSigner.mint(nftHash);
        await tx.wait();

        const response = await fetch('/nft-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user._id }),
        });
        if (!response.ok) {
          throw new Error(
            `There was a problem updating nft count. Request failed with status code ${response.status}`
          );
        }
        const result = await response.json();
        const count = result.count;
        setUser((prevUser) => ({ ...prevUser, nfts_minted: count }));
      } catch (error) {
        console.error(
          `There was an error uploading metadata to ipfs. ERROR ${error}`
        );
      }
    } catch (error) {
      console.error(
        `There was a problem in the process of uploading and or minting nft. ERROR: ${error}`
      );
    } finally {
      setWaiting(false);
      setMetadata(initialMetadata);
      setImage(image);
    }
  };

  return (
    <CenteredBody $secondary>
      <FormTitle className="metadata-h1">Enter Metadata</FormTitle>

      <CenteredParagragh>
        In this section you will name your NFT, give it a description, and add 6
        attributes! If you need some help with this part click{' '}
        <StyledLink href="https://docs.opensea.io/docs/metadata-standards">
          HERE
        </StyledLink>{' '}
        to learn more.
      </CenteredParagragh>
      <Input
        type="input"
        placeholder="NFT Name"
        value={metadata.name}
        onChange={handleNameChange}
      />
      <CenteredParagragh>Give your NFT a name.</CenteredParagragh>
      <Input
        type="input"
        placeholder="NFT Description"
        value={metadata.description || ''}
        onChange={handleDescriptionChange}
      />
      <CenteredParagragh>
        Enter a description, mission, story, or message about your NFT.
      </CenteredParagragh>

      <AttributeBody>
        {metadata.attributes.map((attribute, index) => (
          <SubBody $width="100%" key={index}>
            <Input
              $margin="5px"
              type="input"
              placeholder="Trait Type"
              value={attribute.trait || ''}
              onChange={(e) => handleAttributeChange(e, index, 'trait')}
            />
            <Input
              $margin="5px"
              type="input"
              placeholder="Value"
              value={attribute.value || ''}
              onChange={(e) => handleAttributeChange(e, index, 'value')}
            />
          </SubBody>
        ))}
      </AttributeBody>
      <Button
        $width="100%"
        onClick={handleMetadataClick}
        className="btn mint-btn"
        type="submit"
      >
        Mint NFT
      </Button>
    </CenteredBody>
  );
};

export default MetadataField;
