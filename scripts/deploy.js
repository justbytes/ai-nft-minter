const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const NFTMinter = await ethers.getContractFactory("NFT");
  const nftMinter = await NFTMinter.deploy("NFT Genie", "NFTG");
  await nftMinter.deployed();

  console.log(`Smart contract deployed to ${nftMinter.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
