import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';

import Auth from '../../utils/auth';

import LoggedInContext from '../../LoggedInProvider';

import {
  NavMenu,
  NavbarContainer,
  NavbarWrapper,
  NavLink,
  NavDropdownWrapper,
  NavDropdownContent,
  NavDropdownItem,
  NavDropDownName,
} from './StyledComponents/Navigations';
import { ConnectButton, ConnectedButton } from './StyledComponents/Buttons';

export function Navigation({ account, setAccount }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { loggedIn } = useContext(LoggedInContext);

  // Connect to MetaMask wallet
  const handleConnectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <NavMenu>
          <NavLink href="/">NFT Genie</NavLink>
          <NavLink href="/CreateNft">Make a NFT</NavLink>
          <NavDropdownWrapper $color="white">
            <NavDropDownName
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              Resources
            </NavDropDownName>
            <NavDropdownContent
              className={
                showDropdown
                  ? 'nav-dropdown-content show'
                  : 'nav-dropdown-content'
              }
            >
              <NavDropdownItem href="https://medium.com/bankless-dao/how-to-set-up-a-metamask-wallet-a2cc255bafe2">
                MetaMask Wallet Guide
              </NavDropdownItem>
              <NavDropdownItem href="https://stable-diffusion-art.com/prompt-guide/">
                Prompt Guide
              </NavDropdownItem>
              <NavDropdownItem href="https://opensea.io/">
                View collection on OpenSea
              </NavDropdownItem>
              <NavDropdownItem href="https://goerli.etherscan.io/address/0x5a5fe2dda9a68aec28f4204ade54f245106d0e11">
                View Contract
              </NavDropdownItem>
            </NavDropdownContent>
          </NavDropdownWrapper>
        </NavMenu>
        <NavMenu className="ml-auto">
          {!loggedIn ? (
            <NavLink href="/login">Login</NavLink>
          ) : account ? (
            <>
              <NavLink onClick={Auth.logout}>Logout</NavLink>
              <ConnectedButton $padding="7px" type="button">
                {account.slice(0, 6) + '...' + account.slice(38, 42)}
              </ConnectedButton>
            </>
          ) : (
            <>
              <NavLink onClick={Auth.logout}>Logout</NavLink>
              <ConnectButton
                type="button"
                className="connect-wallet"
                onClick={handleConnectWallet}
              >
                Connect
              </ConnectButton>
            </>
          )}
        </NavMenu>
      </NavbarContainer>
    </NavbarWrapper>
  );
}
