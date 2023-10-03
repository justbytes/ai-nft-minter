import React, { useContext } from 'react';

import LoggedInContext from '../../../LoggedInProvider';

import {
  Card,
  BorderedCardBody,
  FlexCardBody,
  CardTitle3,
  CardTitle4,
} from '../StyledComponents/Cards';
import { CenteredParagragh, Paragragh } from '../StyledComponents/Paragraphs';
import { ButtonLink } from '../StyledComponents/Links';
import { ActivityBox } from '../StyledComponents/Boxs';

const UserInfo = ({ user }) => {
  const { loggedIn } = useContext(LoggedInContext);

  return !loggedIn ? (
    <Card $secondary $width="27%" $margin="10px" $padding="5px">
      <CenteredParagragh>Login to view your profile.</CenteredParagragh>
      <ButtonLink $padding="5px" $width="6%" link="/login">
        Login
      </ButtonLink>
    </Card>
  ) : (
    <Card $secondary $width="27%" $margin="10px" $padding="5px">
      <CardTitle3 $padding="10px">Welcome {user?.username}</CardTitle3>
      <CardTitle4 $color="grey">Account Information</CardTitle4>
      <BorderedCardBody $padding="5px">
        <Paragragh $margin="5px 0">
          Name: {user?.firstname} {user?.lastname}
        </Paragragh>
        <Paragragh $margin="5px 0">Email: {user?.email}</Paragragh>
      </BorderedCardBody>
      <CardTitle4 $color="grey">Wallet</CardTitle4>
      <BorderedCardBody>
        <Paragragh>connect wallet button</Paragragh>
      </BorderedCardBody>

      <CardTitle4 $color="grey">Account Activity</CardTitle4>
      <BorderedCardBody>
        <FlexCardBody $padding="5px" $margin="10px">
          <ActivityBox
            title="Images Generated"
            content={user?.images_generated}
          />
          <ActivityBox title="Images Minted" content={user?.nfts_minted} />
        </FlexCardBody>
        <FlexCardBody $padding="5px" $margin="10px">
          <CenteredParagragh>Recent Images</CenteredParagragh>
        </FlexCardBody>
      </BorderedCardBody>
    </Card>
  );
};

export default UserInfo;
