import React from 'react';

import {
  CenteredSection,
  EvenSection,
} from './components/StyledComponents/Sections';

import Welcome from './components/Home/Welcome';
import Instructions from './components/Home/Instructions';
import NftGenieLogo from './components/Home/NftGenieLogo';

export function Home() {
  return (
    <>
      <CenteredSection>
        <Welcome />
      </CenteredSection>
      <EvenSection $secondary>
        <Instructions />
        <NftGenieLogo />
      </EvenSection>
    </>
  );
}
