const { ethers } = require("ethers")
const contractAbi = require('../../artifacts/contracts/SwissTreasury/Setup.sol/SetupSwissTreasury.json')

const main = async () => {

    //deploy contract 
    // const SetUpFactory = await hre.ethers.getContractFactory("SetupSwissTreasury")
    // const setUpContract = await SetUpFactory.deploy()
    // await setUpContract.deployed()
    const setUpAddress = '0xfb12592c065c25cEB79896d6364D3F3C099da02D'
    const setUpContract = await hre.ethers.getContractAt("SetupSwissTreasury", setUpAddress)

    console.log("set up deployed at: ", setUpContract.address)

    //deploy instance 
    const instanceAddress = await setUpContract.callStatic.createInstance({value: hre.ethers.utils.parseEther('0.01')})
    const tx = await setUpContract.createInstance({value: hre.ethers.utils.parseEther('0.01')})
    tx.wait()

    console.log("instance deployed at: ", instanceAddress)
}



main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
