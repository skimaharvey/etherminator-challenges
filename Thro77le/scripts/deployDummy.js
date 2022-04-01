

const main = async () => {

    const DummyFactory = await hre.ethers.getContractFactory("Dummy")
    const dummy = await DummyFactory.deploy()

    await dummy.deployed()

    console.log("Dummy deployed at", dummy.address)

    // last deploy: 0xd5064b7067EAfA6a30ef8b20BcD0bbDa82D0F21e
}



main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});