import React from 'react';

// Importing Styled Components
import { FlexSection } from './components/StyledComponents/Sections';
import { Form } from './components/StyledComponents/Forms';

// Importing components
import PromptField from './components/CreateNft/PromptField';
import MetadataField from './components/CreateNft/MetadataField';
import Results from './components/CreateNft/Results';

// Importing Context
import { WaitingProvider } from './components/CreateNft/ContentProviders/WaitingProvider';
import { ImageProvider } from './components/CreateNft/ContentProviders/ImageProvider';
import { MetadataHashProvider } from './components/CreateNft/ContentProviders/MetadataProvider';
import UserInfo from './components/CreateNft/UserInfo';

export function CreateNft({ provider, nftContract }) {
  return (
    <WaitingProvider>
      <ImageProvider>
        <MetadataHashProvider>
          <FlexSection>
            <Form $width="40%" $margin="10px" $padding="5px">
              <PromptField />
              <MetadataField provider={provider} nftContract={nftContract} />
            </Form>
            <Results />
            <UserInfo />
          </FlexSection>
        </MetadataHashProvider>
      </ImageProvider>
    </WaitingProvider>
  );
}
