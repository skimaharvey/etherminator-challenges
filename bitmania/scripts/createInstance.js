

const main = async () => {

    const setupAddress = "0xE1e9ffa320Fa1A55A9881C4d8B4F52bc952720A9"
    const setup = await hre.ethers.getContractAt("Setup", setupAddress)

    // const instanceAddress = await setup.staticCall.createInstance()

    const tx = await setup.createInstance()
    // console.log("instanceAddress", instanceAddress)
    console.log("tx hash", tx.hash)
}





main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
