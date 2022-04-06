const hre = require("hardhat");

async function main() {
  const SetupFactory = await hre.ethers.getContractFactory("Setup")
  const setup = await SetupFactory.deploy()
  await setup.deployed()

  console.log("setup deployed at:", setup.address)

  //verified at: https://rinkeby.etherscan.io/address/0x0468e5A5383b0aDd8088E3b48905252c6aD71dfC#code
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
