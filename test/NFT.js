const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AI NFT Minter", () => {
  describe("Deployment", () => {
    it("Successfully Deploys", async () => {
      const NFTMinter = await ethers.getContractFactory("NFT");
      const nftMinter = await NFTMinter.deploy("test", "TST");
      await nftMinter.deployed();
    });
  });
});
