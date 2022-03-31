



const main = async() => {

    const SetupFactory = await hre.ethers.getContractFactory("Setup")
    const setup = await SetupFactory.deploy()

    await setup.deployed()

    console.log("Deployed setup at:", setup.address)
}




main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
