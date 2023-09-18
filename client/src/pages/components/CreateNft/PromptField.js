import React, { useState, useContext } from 'react';
import fetch from 'node-fetch';

import ImageContext from './ContentProviders/ImageProvider';
import WaitingContext from './ContentProviders/WaitingProvider';
import { FormBody, FormTitle } from '../StyledComponents/Forms';
import { BigInput } from '../StyledComponents/Inputs';
import { CenteredParagragh } from '../StyledComponents/Paragraphs';
import { StyledLink } from '../StyledComponents/Links';
import { Button } from '../StyledComponents/Buttons';

const PromptField = () => {
  const { setWaiting } = useContext(WaitingContext);
  const { setImage } = useContext(ImageContext);
  const [prompt, setPrompt] = useState('');

  // Updates state with users prompt
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
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
      setWaiting(true);

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
      const imageUrl = result.output[0];

      setImage(imageUrl);
    } catch (error) {
      console.error(`Error when generating image: ${error}`);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <FormBody $secondary>
      <FormTitle className="prompt-h1">Enter Prompt</FormTitle>
      <BigInput rows="3" onChange={handlePromptChange} />
      <CenteredParagragh>
        What makes a good{' '}
        <StyledLink href="https://stable-diffusion-art.com/prompt-guide/">
          PROMPT
        </StyledLink>
        ?
      </CenteredParagragh>
      <Button
        $width="100%"
        className="btn generate-btn"
        onClick={handleImageGenerationClick}
      >
        Generate Image
      </Button>
    </FormBody>
  );
};

export default PromptField;
