
const hre = require("hardhat");

async function main() {

  const ChallengeFactory = await hre.ethers.getContractFactory("Challenge")
  const challenge = await ChallengeFactory.deploy({value: hre.ethers.utils.parseEther("0.01")})
  await challenge.deployed()

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
