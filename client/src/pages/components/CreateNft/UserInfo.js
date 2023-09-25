import React, { useContext, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { USER_INFO } from '../../../utils/queries';

import LoggedInContext from '../../../LoggedInProvider';

import {
  Card,
  BottomBorderCardBody,
  FlexCardBody,
  CardTitle3,
} from '../StyledComponents/Cards';
import { CenteredParagragh, Paragragh } from '../StyledComponents/Paragraphs';
import { ButtonLink } from '../StyledComponents/Links';

const UserInfo = () => {
  const [user, setUser] = useState({});
  const { loggedIn } = useContext(LoggedInContext);
  const token = localStorage.getItem('id_token');

  // Use the token to set up an Apollo Client context
  const { loading, error, data } = useQuery(USER_INFO, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  useEffect(() => {
    if (loading) {
      console.log('Loading...');
    } else if (error) {
      console.error(error);
    } else {
      const user = data?.me;
      setUser(user);
    }
  }, [loading, error, data]);

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

      <BottomBorderCardBody $padding="5px">
        <Paragragh>
          Name: {user?.firstname} {user?.lastname}
        </Paragragh>
        <Paragragh>Email: {user?.email}</Paragragh>
      </BottomBorderCardBody>
      <FlexCardBody $padding="5px" $margin="10px">
        <CenteredParagragh>NFTs Minted: #</CenteredParagragh>
        <CenteredParagragh>Images Generated: #</CenteredParagragh>
      </FlexCardBody>
      <FlexCardBody $padding="5px" $margin="10px">
        <CenteredParagragh>Recent Images</CenteredParagragh>
      </FlexCardBody>
    </Card>
  );
};

export default UserInfo;
