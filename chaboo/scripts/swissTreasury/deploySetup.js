const { ethers } = require("ethers");
const { hexStripZeros } = require("ethers/lib/utils");

const main = async () => {

  const SetupContractFactory = await hre.ethers.getContractFactory("SetupSwissTreasury")  
  const setUpContract = await SetupContractFactory.deploy()

  await setUpContract.deployed()

  console.log("Deployed at: ", setUpContract.address);
}



main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
