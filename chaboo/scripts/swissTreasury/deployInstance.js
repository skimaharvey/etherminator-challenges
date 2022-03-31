const { ethers } = require("hardhat");

const main = async () => {
    const minDelay = 86400
    const executors = ["0x0000000000000000000000000000000000000000"]
    const proposers = []

    //deploy SwissTreasury
    const SwissTreasuryFactory = await hre.ethers.getContractFactory("SwissTreasury")
    const swissTreasuryContract = await SwissTreasuryFactory.deploy(minDelay, proposers, executors, {value: ethers.utils.parseEther("0.01")})
    await swissTreasuryContract.deployed()

    console.log("Contrat deployed at:", swissTreasuryContract.address);

    await hre.run("verify:verify", {
        address: swissTreasuryContract.address,
        constructorArguments: [
          minDelay,
          executors,
          proposers
        ],
      });

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});