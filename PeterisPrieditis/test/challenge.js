const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Swap", function () {

  let deployer, attacker;
  before( async function(){

    [deployer, attacker] = await hre.ethers.getSigners()

    const USDCFactory = await hre.ethers.getContractFactory("ERC20PresetFixedSupply", deployer)
    this.USDC = await USDCFactory.deploy("USDC Stablecoin", "USDC", 11000, deployer.address)

    const USDTFactory = await hre.ethers.getContractFactory("ERC20PresetFixedSupply", deployer)
    this.USDT = await USDTFactory.deploy("USDT Stablecoin", "USDT", 11000, deployer.address)

    const BUSDFactory = await hre.ethers.getContractFactory("ERC20PresetFixedSupply", deployer)
    this.BUSD = await BUSDFactory.deploy("BUSD Stablecoin", "BUSD", 11000, deployer.address)

    const StableSwapFactory = await hre.ethers.getContractFactory("StableSwap2", deployer)
    this.stableSwap = await StableSwapFactory.deploy()

    await this.stableSwap.addCollateral(this.USDC.address)
    await this.stableSwap.addCollateral(this.USDT.address)
    await this.stableSwap.addCollateral(this.BUSD.address)

    this.USDC.approve(this.stableSwap.address, 1000000)
    this.USDT.approve(this.stableSwap.address, 1000000)
    this.BUSD.approve(this.stableSwap.address, 1000000)

    let amounts= [];
    const amountUSDC = await this.USDC.balanceOf(deployer.address) - 1000
    const amountUSDT = await this.USDT.balanceOf(deployer.address)
    const amountBUSD = await this.BUSD.balanceOf(deployer.address) 
    
    amounts.push(amountUSDC, amountUSDT.toNumber(), amountBUSD.toNumber())

    await this.stableSwap.mint(amounts)
    console.log(amounts)

  })

  it("exploit", async function () {

  });
});
