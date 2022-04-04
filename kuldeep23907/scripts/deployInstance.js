
const main = async () => {

    const setupAddress = "0x6eA69A33E5570C47C249890C855C2F1D9075E4B6"
    const setup = await hre.ethers.getContractAt("Setup", setupAddress)

    const tx = await setup.createInstance({value: ethers.utils.parseEther("0.01")})

    console.log(await tx.hash)

    //deployed at: https://rinkeby.etherscan.io/address/0xe24529618b5216Ce00dcA1DC901f4E2EF1e5C6F3#code
}




main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});