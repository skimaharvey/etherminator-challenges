const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const SetupFactory = await hre.ethers.getContractFactory("Setup")
    const setup = await SetupFactory.deploy()
    await setup.deployed()

    console.log("setup", setup.address)
    //https://rinkeby.etherscan.io/address/0xE1e9ffa320Fa1A55A9881C4d8B4F52bc952720A9#code
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
