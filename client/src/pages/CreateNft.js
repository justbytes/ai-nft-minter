import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { USER_INFO } from '../utils/queries';

// Importing Styled Components
import { FlexSection } from './components/StyledComponents/Sections';
import { Form } from './components/StyledComponents/Forms';

// Importing components
import PromptField from './components/CreateNft/PromptField';
import MetadataField from './components/CreateNft/MetadataField';
import Results from './components/CreateNft/Results';
import UserInfo from './components/CreateNft/UserInfo';

// Importing Context
import { WaitingProvider } from './components/CreateNft/ContentProviders/WaitingProvider';
import { ImageProvider } from './components/CreateNft/ContentProviders/ImageProvider';
import { MetadataHashProvider } from './components/CreateNft/ContentProviders/MetadataProvider';

export function CreateNft({ provider, nftContract, account, setAccount }) {
  const [user, setUser] = useState({});
  const userDataLength = Object.keys(user).length;
  const { loading, error, data } = useQuery(USER_INFO);

  useEffect(() => {
    try {
      if (loading) {
        console.log('loading..');
      }
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log('User Data:', data);
        setUser(data?.me);
      }
    } catch (error) {
      console.error(error);
    }
  }, [data, error, loading, userDataLength]);

  return (
    <WaitingProvider>
      <ImageProvider>
        <MetadataHashProvider>
          <FlexSection>
            <Form
              $width="40%"
              $margin="10px"
              $padding="5px"
              $overflow
              $maxHeight="100vh"
            >
              <PromptField user={user} setUser={setUser} />
              <MetadataField
                user={user}
                setUser={setUser}
                provider={provider}
                nftContract={nftContract}
              />
            </Form>
            <Results />
            <UserInfo user={user} account={account} setAccount={setAccount} />
          </FlexSection>
        </MetadataHashProvider>
      </ImageProvider>
    </WaitingProvider>
  );
}
