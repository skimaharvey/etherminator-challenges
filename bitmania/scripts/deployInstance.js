const hre = require("hardhat");

async function main() {

  const BitmaniaFactory = await hre.ethers.getContractFactory("BitMania")
  const bitmania = await BitmaniaFactory.deploy()
  await bitmania.deployed()

  console.log("Deployed at:", bitmania.address)
  // https://rinkeby.etherscan.io/address/0xDF96656Ed425b7f39278b4d0B68169D012B20CD1#code  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
