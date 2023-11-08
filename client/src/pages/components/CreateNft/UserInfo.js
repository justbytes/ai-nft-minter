import React, { useContext } from 'react';

import LoggedInContext from '../../../LoggedInProvider';

import { NotLoggedIn } from './UserComponents/NotLoggedIn';
import { AccountInfo } from './UserComponents/AccountInfo';
import { AccountActivity } from './UserComponents/AccountActivity';

import { Card, CardTitle3 } from '../StyledComponents/Cards';

const UserInfo = ({ user, account, setAccount }) => {
  const { loggedIn } = useContext(LoggedInContext);

  return !loggedIn ? (
    <NotLoggedIn />
  ) : (
    <Card
      $secondary
      $width="27%"
      $margin="10px"
      $padding="5px"
      $maxHeight="100vh"
      $overflow
    >
      <CardTitle3 $padding="10px">Welcome {user?.username}</CardTitle3>
      <AccountInfo user={user} account={account} setAccount={setAccount} />
      <AccountActivity user={user} />
    </Card>
  );
};

export default UserInfo;
