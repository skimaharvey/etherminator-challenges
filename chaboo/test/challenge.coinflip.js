const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Coinfleep", function () {
  it("Should return exploit == true", async function () {
    const SetupCoinFlipFactory = await ethers.getContractFactory("SetupCoinFlip");
    const setupCoinFlip = await SetupCoinFlipFactory.deploy();
    await setupCoinFlip.deployed();
    console.log('setup deployed')

    //deploy coinflip 
    const coinFlipAddress = await setupCoinFlip.callStatic.createInstance()
    await setupCoinFlip.createInstance()
    console.log('coinflip deployed')

    //deploy exploit 
    const exploitContract = await (await ethers.getContractFactory("ExploitCoinFlip")).deploy(coinFlipAddress)
    await exploitContract.deployed()
    const tx = await exploitContract.exploit()
  


    expect(await setupCoinFlip.callStatic.levelStatus()).to.eq(true);
  });
});
