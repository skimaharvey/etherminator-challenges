require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan");


const {INFURA_URL, PVT_KEY, ETHERSCAN_KEY} = process.env



/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.7.6",
      },
    ],
  },
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [PVT_KEY],
      gas: 6000000
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY
  },
};
