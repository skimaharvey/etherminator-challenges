

const main = async () => {

    const SetupFactory = await hre.ethers.getContractFactory("Setup")
    const setup = await SetupFactory.deploy()
    await setup.deployed()

    console.log("set up deployed at:", setup.address)
    //last deploy 0x87f29abd5b2cc536a01a985332456b79481CCEf2
}






main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});