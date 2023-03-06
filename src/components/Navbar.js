import React from "react";
import { ethers } from "ethers";

const Navbar = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>AI NFT Minter</h1>
      </div>

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
    </nav>
  );
};

export default Navbar;
