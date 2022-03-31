const { parseEther } = require("ethers/lib/utils");

async function main() {
  const SETUP = await ethers.getContractFactory("Setup");
  const EXPLOIT = await ethers.getContractFactory("ExploitSwissTreasury");
  const setup = await SETUP.deploy({ value: parseEther("0.01") });
  const ctf = await ethers.getContractAt("SwissTreasury", await setup.instance());

  console.log("solved:", await setup.isSolved());
  const exploit = await EXPLOIT.deploy(ctf.address);
  await exploit.finalize();
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });