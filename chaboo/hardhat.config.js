require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");

const {ALCHEMY_URL, PVT_KEY, INFURA_URL, ETHERSCAN_KEY} = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
      },
      {
        version: "0.8.4",
      },
    ],
  },
  networks: {
    rinkeby: {
      url: ALCHEMY_URL, 
      accounts: [PVT_KEY],
      // gasPrice: 8000000000
    },
    rinkebyInfura: {
      url: INFURA_URL, 
      accounts: [PVT_KEY],   
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_KEY
  }
};
