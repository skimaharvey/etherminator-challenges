

const main = async () => {

    

    const ChallengeFactory = await hre.ethers.getContractFactory("Challenge")
    const challenge = await ChallengeFactory.deploy("0xA4402Bf8Bd4d5825e66012D0e9175F8F76A0e811")
    await challenge.deployed()

    console.log("challenge deployed at", challenge.address)


    //deployed at 0x56ca672508e249F24eC9536D4e1aEC949746dD3e
    //url: https://rinkeby.etherscan.io/address/0x56ca672508e249F24eC9536D4e1aEC949746dD3e#code
}



main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});