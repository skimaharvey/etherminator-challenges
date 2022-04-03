const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Culdeep",  function () {
  let deployer, attacker;

  before( async () => {
    [deployer, attacker] = await ethers.getSigners();

    const SloganFactory = await hre.ethers.getContractFactory("Slogan", deployer)
    this.slogan = await SloganFactory.deploy()
    await this.slogan.deployed()

    const SloganProxyFactory = await hre.ethers.getContractFactory("SloganProxy", deployer);
    this.sloganProxy = await SloganProxyFactory.deploy();
    await this.sloganProxy.deployed()
    await this.sloganProxy.initialize(this.slogan.address, "")
    
    const ChallengeFactory = await hre.ethers.getContractFactory("Challenge", deployer)
    this.challenge = await ChallengeFactory.deploy({value: ethers.utils.parseEther("0.01")}, this.sloganProxy.address)
    await this.challenge.deployed()

  })
  it("get the challenge contract balance to 0", async function () {

    const ExploitFactory = await hre.ethers.getContractFactory("Exploit", attacker)
    const exploit  = await ExploitFactory.deploy(attacker.address)
    await exploit.deployed()
  
    //call callSloganContract with exlploit address
    const slogan = await this.slogan.connect(attacker)



  });
  after(async () => {
    
  })
});
