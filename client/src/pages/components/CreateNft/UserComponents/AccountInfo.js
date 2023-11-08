import React from 'react';

import { ConnectWallet } from './ConnectWallet';

import { BorderedCardBody, CardTitle4 } from '../../StyledComponents/Cards';
import { Paragragh } from '../../StyledComponents/Paragraphs';

export function AccountInfo({ user, account, setAccount }) {
  return (
    <>
      <CardTitle4 $color="grey">Account Information</CardTitle4>
      <BorderedCardBody $padding="5px">
        <Paragragh $margin="5px 0">
          Name: {user?.firstname} {user?.lastname}
        </Paragragh>
        <Paragragh $margin="5px 0">Email: {user?.email}</Paragragh>
      </BorderedCardBody>
      <CardTitle4 $color="grey">Wallet</CardTitle4>
      <BorderedCardBody>
        <ConnectWallet account={account} setAccount={setAccount} />
      </BorderedCardBody>
    </>
  );
}
