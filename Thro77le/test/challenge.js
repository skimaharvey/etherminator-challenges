const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Thro77le", function () {

  let attacker, deployer;

  before(async function() {
    
    [attacker, deployer] = await ethers.getSigners();

    //deploy Dummy contract 
    this.DummyFactory = await hre.ethers.getContractFactory("Dummy", deployer);
    this.dummy = await this.DummyFactory.deploy();
    await this.dummy.deployed();

    //deploy Factory contract 
    const FactoryFactory = await hre.ethers.getContractFactory("Factory", deployer)
    this.factory = await FactoryFactory.deploy()
    await this.factory.deployed()

    //deploy Challenge contract 
    const ChallengeFactory = await hre.ethers.getContractFactory("Challenge", deployer)
    this.challenge = await ChallengeFactory.deploy(this.factory.address)
    await this.challenge.deployed()



  })

  it("Should generate the correct address", async function () {

    //deploy exploit 
    const ExploitFactory = await hre.ethers.getContractFactory("Exploit")
    const exploit = await ExploitFactory.deploy()
    await exploit.deployed()

    let randomSalt;
    let generatedAddress;
    const dummyByteCode = this.DummyFactory.bytecode 
    let goodSalt;
    
    //bytes needed to be in the last 15 bytes of the address
    const neededBytes = "f0b1d"

    //generate address using the create2 opcode
    const generateAddress = (salt) => ethers.utils.getCreate2Address(this.factory.address, salt, ethers.utils.keccak256(dummyByteCode))

    const checkIfEOA = async (address) => {
      if(await hre.ethers.provider.getCode(address) == '0x'){
        console.log('good address')
       return true
      }
    }

    for (var i = 900000; i < 1000000; i++) {
      randomSalt = ethers.utils.hexZeroPad(ethers.utils.hexlify(i), 32)
      generatedAddress = generateAddress(randomSalt)
      generatedAddress = ethers.utils.hexDataSlice(generatedAddress,0,20)
      if(generatedAddress.substring(10, 41).includes(neededBytes)){
        goodSalt = i
        if(await checkIfEOA(generatedAddress)){
          break
        }
      }
    }

    console.log("goodSalt", goodSalt)
    console.log(generatedAddress)

    //good salt: 930675
    const tx = await exploit.transferFunds(generatedAddress, {value: ethers.utils.parseEther("0.01")})
    await tx.wait(1)

    await this.challenge.createContract(dummyByteCode, goodSalt)
    

  });

  after( async function() {

  })
});
