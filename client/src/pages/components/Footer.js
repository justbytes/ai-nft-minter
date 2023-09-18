import React from 'react';

//Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import { StyledFooter } from './StyledComponents/Footers';
import { StyledLink } from './StyledComponents/Links';

export function Footer() {
  return (
    <StyledFooter>
      <StyledLink $margin="20px" href="https://discord.gg/ur9tFfDC">
        <FontAwesomeIcon
          icon={faDiscord}
          size="lg"
          style={{ color: '#e7eaee' }}
        />
      </StyledLink>
      <StyledLink $margin="20px" href="https://twitter.com/to_devy">
        <FontAwesomeIcon
          icon={faTwitter}
          size="lg"
          style={{ color: '#e7eaee' }}
        />
      </StyledLink>
      <StyledLink
        $margin="20px"
        href="https://github.com/justbytes/ai-nft-minter"
      >
        <FontAwesomeIcon
          icon={faGithub}
          size="lg"
          style={{ color: '#e7eaee' }}
        />
      </StyledLink>
    </StyledFooter>
  );
}
