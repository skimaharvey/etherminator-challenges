require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");


const {INFURA_URL, PVT_KEY, ETHERSCAN_KEY} = process.env




// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
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
