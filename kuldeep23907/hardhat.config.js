require("@nomiclabs/hardhat-waffle");
require("dotenv").config()


const {INFURA_URL, PVT_KEY, ETHERSCAN_KEY} = process.env

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  network: {
    rinkeby:{
      url: INFURA_URL,
      accounts: [PVT_KEY]
    }
  }
};
