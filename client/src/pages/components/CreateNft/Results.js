import React, { useContext } from 'react';

import WaitingContext from './ContentProviders/WaitingProvider';
import ImageContext from './ContentProviders/ImageProvider';
import MetadataHashContext from './ContentProviders/MetadataProvider';

// Import NFT Genie logo picture
import Genie from '../../../images/genie.jpeg';

import { Figure, StyledImage } from '../StyledComponents/Figures';
import { Card } from '../StyledComponents/Cards';
import { CenteredParagragh } from '../StyledComponents/Paragraphs';
import { StyledLink } from '../StyledComponents/Links';

const Results = () => {
  const { waiting } = useContext(WaitingContext);
  const { image } = useContext(ImageContext);
  const { metadataHash } = useContext(MetadataHashContext);
  // TODO: Change this to a switch case
  return (
    <Card $width="30%" $margin="10px" $padding="5px">
      {!waiting && image ? (
        <Figure>
          <StyledImage width="100%" src={image} alt="AI Generated" />
        </Figure>
      ) : waiting ? (
        <Figure>
          {/* Create a custom spinner an place here */}
          <CenteredParagragh>Loading please wait...</CenteredParagragh>
        </Figure>
      ) : !waiting ? (
        <Figure $width="100%">
          <StyledImage width="100%" alt="NFT Genie Logo" src={Genie} />
        </Figure>
      ) : (
        <></>
      )}

      {metadataHash !== '' ? (
        <CenteredParagragh>
          View{' '}
          <StyledLink $color="orange" href={metadataHash}>
            Metadata
          </StyledLink>
        </CenteredParagragh>
      ) : (
        <CenteredParagragh>
          Metadata will be displayed here after creating a NFT!
        </CenteredParagragh>
      )}
    </Card>
  );
};

export default Results;
