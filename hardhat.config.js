require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_PRIVATE_KEY}`,
      accounts: [process.env.WALLET_KEY],
    },
    // mainnet: {
    //   url: `${process.env.MAINNET_URL}`,
    //   accounts: [process.env.NFT_GENIE_KEY]
    // }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
};
