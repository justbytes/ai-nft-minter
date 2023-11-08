import React from 'react';

import { CustomCard, BorderedCardBody } from '../../StyledComponents/Cards';
import { CenteredParagragh } from '../../StyledComponents/Paragraphs';
import { ButtonLink } from '../../StyledComponents/Links';

export function NotLoggedIn() {
  return (
    <CustomCard
      $secondary
      $width="27%"
      $margin="10px"
      $padding="5px"
      $borderRadius="5px"
      $border
      $flex
    >
      <BorderedCardBody $width="90%" $margin="auto" $padding="10%">
        <CenteredParagragh>Login to view your profile.</CenteredParagragh>
        <ButtonLink $padding="5px" link="/login">
          Login
        </ButtonLink>
      </BorderedCardBody>
    </CustomCard>
  );
}
