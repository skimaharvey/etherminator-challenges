


const main = async() => {

    const setupAddress = "0x0468e5A5383b0aDd8088E3b48905252c6aD71dfC"
    const setup = await hre.ethers.getContractAt("Setup",setupAddress)

    const tx = await setup.createInstance()

    console.log("tx:", tx.hash)
    
}



main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
