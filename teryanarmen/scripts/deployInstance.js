
const main = async () => {

    const VaultFactory = await hre.ethers.getContractFactory("Vault");
    const vault = await VaultFactory.deploy({value: hre.ethers.utils.parseEther("0.01")})

    await vault.deployed()

    console.log("vault deployed at: ", vault.address)
}


main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
