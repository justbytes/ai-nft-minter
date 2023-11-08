import React, { useState, useContext } from 'react';

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

export function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { loggedIn } = useContext(LoggedInContext);

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
          ) : (
            <NavLink onClick={Auth.logout}>Logout</NavLink>
          )}
        </NavMenu>
      </NavbarContainer>
    </NavbarWrapper>
  );
}
