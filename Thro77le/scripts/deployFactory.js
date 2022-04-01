

const main = async() => {

    const FactoryFactory = await hre.ethers.getContractFactory("Factory");
    const factory = await FactoryFactory.deploy()
    await factory.deployed()

    console.log('factory deployed at: ', factory.address)

    //last deploy: 0xA4402Bf8Bd4d5825e66012D0e9175F8F76A0e811
}




main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});