

const main = async () => {
    const CasinoFactory = await hre.ethers.getContractFactory("Casino")
    const casino = await CasinoFactory.deploy()
    await casino.deployed()

    console.log("casino deployed at:", casino.address)

    //verified at: https://rinkeby.etherscan.io/address/0x320469a3F7520b64E8577Be7fC99803180DAfEf2#code
}


main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
