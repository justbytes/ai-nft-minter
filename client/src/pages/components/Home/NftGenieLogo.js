import React from 'react';

import { Figure, StyledImage } from '../StyledComponents/Figures';

import Genie from '../../../images/genie.jpeg';

const NftGenieLogo = () => {
  return (
    <Figure $width="23%">
      <StyledImage width="100%" alt="NFT Genie Logo" src={Genie} />
    </Figure>
  );
};

export default NftGenieLogo;
