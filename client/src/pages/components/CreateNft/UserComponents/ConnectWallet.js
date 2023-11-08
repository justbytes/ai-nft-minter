import React from 'react';
import { ethers } from 'ethers';

import { ConnectButton, ConnectedButton } from '../../StyledComponents/Buttons';

export function ConnectWallet({ account, setAccount }) {
  // Connect to MetaMask wallet
  const handleConnectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return account ? (
    <ConnectedButton $padding="7px" type="button">
      {account.slice(0, 6) + '...' + account.slice(38, 42)}
    </ConnectedButton>
  ) : (
    <ConnectButton
      type="button"
      className="connect-wallet"
      onClick={handleConnectWallet}
    >
      Connect
    </ConnectButton>
  );
}
