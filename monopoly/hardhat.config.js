require("@nomiclabs/hardhat-waffle");
require("dotenv").config()


const {INFURA_URL, PVT_KEY, ETHERSCAN_KEY} = process.env

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  // networks: {
    // hardhat: {
    //   accounts: {PVT_KEY},
    // }
  // },
  mocha: {
    timeout: 5000000
  }
};
