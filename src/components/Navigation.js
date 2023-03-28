import React, { useState } from "react";
import { ethers } from "ethers";
//Import React components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

export function Navigation({ account, setAccount }) {
  //Set state variables
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleDropdownLeave = () => {
    setShowDropdown(false);
  };

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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar justify-content-start">
            <Nav.Link href="#/home">Home</Nav.Link>
            <NavDropdown
              className="nav-dropdown"
              title="Resources"
              id="basic-nav-dropdown"
              show={showDropdown}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <NavDropdown.Item>Set up a MetaMask Wallet</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Prompt like a pro!</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>What's an NFT?</NavDropdown.Item>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
