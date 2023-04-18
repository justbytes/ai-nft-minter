import React, { useState } from "react";
import { ethers } from "ethers";

// Import React components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

export function Navigation({ account, setAccount }) {
  //Set state variable
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggles dropdown when mouse hovers
  const handleDropdownMouseEnter = () => {
    setShowDropdown(true);
  };
  // Toggles dropdown when mouse hovers
  const handleDropdownLeave = () => {
    setShowDropdown(false);
  };

  // Connect to MetaMask wallet
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <Navbar className="navbar-container" expand="lg">
      <Container fluid>
        <Nav className="me-auto navbar justify-content-start">
          <Nav.Link href="#/home">NFT Genie</Nav.Link>
          <Nav.Link href="#/aiNFT">Make a NFT</Nav.Link>
          <NavDropdown
            className="nav-dropdown"
            title="Resources"
            id="basic-nav-dropdown"
            show={showDropdown}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <NavDropdown.Item href="https://medium.com/bankless-dao/how-to-set-up-a-metamask-wallet-a2cc255bafe2">
              MetaMask Wallet Guide
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://stable-diffusion-art.com/prompt-guide/">
              Prompt Guide
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://opensea.io/">
              View collection on OpenSea
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>View Contract</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          {account ? (
            <button type="button" className="connect-wallet">
              {account.slice(0, 6) + "..." + account.slice(38, 42)}
            </button>
          ) : (
            <button
              type="button"
              className="connect-wallet"
              onClick={connectHandler}
            >
              Connect
            </button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
