const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Culdeep",  async function () {
  let deployer, attacker ;

  before( async function() {
    [deployer, attacker] = await ethers.getSigners();

    const SloganFactory = await hre.ethers.getContractFactory("Slogan", deployer)
    this.slogan = await SloganFactory.deploy()
    await this.slogan.deployed()

    const SloganProxyFactory = await hre.ethers.getContractFactory("SloganProxy", deployer);
    this.sloganProxy = await SloganProxyFactory.deploy();
    await this.sloganProxy.deployed()
    await this.sloganProxy.initialize(this.slogan.address,[])
    
    const ChallengeFactory = await hre.ethers.getContractFactory("Challenge", deployer)
    this.challenge = await ChallengeFactory.deploy( this.sloganProxy.address, {value: ethers.utils.parseEther("0.01")})
    await this.challenge.deployed()

    expect(await hre.ethers.provider.getBalance(this.challenge.address)).to.eq(ethers.utils.parseEther("0.01"))

  });

  it("get the challenge contract balance to 0", async function () {

    const ExploitFactory = await hre.ethers.getContractFactory("Exploit", attacker)
    const exploit  = await ExploitFactory.deploy(this.challenge.address)
    await exploit.deployed()

  });
  after(async function()  {
    expect(await hre.ethers.provider.getBalance(this.challenge.address)).to.eq(0)
  })
});
