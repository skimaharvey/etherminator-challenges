
const hre = require("hardhat");

async function main() {
  const VaultFactory = await ethers.getContractFactory("Vault");
  const vault = await VaultFactory.deploy({value: ethers.utils.parseEther("0.01")});
  await vault.deployed();

  await vault.third()

  const ExploitFactory = await hre.ethers.getContractFactory("Exploit");
  const exploitContract = await ExploitFactory.deploy(vault.address)
  await exploitContract.deployed()

  // await exploitContract.call2nd()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
