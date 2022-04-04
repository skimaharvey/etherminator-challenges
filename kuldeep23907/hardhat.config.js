require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");


const {INFURA_URL, PVT_KEY, ETHERSCAN_KEY} = process.env

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby:{
      url: INFURA_URL,
      accounts: [PVT_KEY],
      gas: 6000000
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY
  },
};
