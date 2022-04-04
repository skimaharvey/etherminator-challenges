

const main = async () => {

    const FactorySetup = await hre.ethers.getContractFactory("Setup")
    const setup = await FactorySetup.deploy()
    await setup.deployed()

    console.log("setup address", setup.address)

    //verified https://rinkeby.etherscan.io/address/0x6eA69A33E5570C47C249890C855C2F1D9075E4B6#code
}


main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});