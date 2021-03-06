const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bitmania", function () {
  let deployer, attacker ;

  before(async function(){
    [deployer, attacker] = await ethers.getSigners()

    const BitmaniaFactory = await hre.ethers.getContractFactory("BitMania", deployer)
    this.bitmania = await BitmaniaFactory.deploy()
    await this.bitmania.deployed()

    expect(await this.bitmania.isSolved()).to.eq(false)

  })

  it("exploit", async function () {

    const bitmania = await this.bitmania.connect(attacker)

    // const ExploitFactory = await hre.ethers.getContractFactory("Exploit", attacker)
    // const exploit = await ExploitFactory.deploy()
    // await exploit.deployed()
    
    let bytesGenerated = ""
    const bytesToGet = "6e3c5b0f722c430e6d324c0d6f67173d4b1565345915753504211f"

    const encryptor = (desiredByte, position) => {
      let previousByte;
      for(i=0; i <= 255; i++) {
        let temp;
        let flag = i
        if(position >0) {  
          previousByte = bytesToGet.substring(position - 2,position)
          const previousInt = parseInt(`0x${previousByte}`)
          flag = flag ^ previousInt
          temp = flag
        }
        flag = flag ^ flag >> 4
        flag = flag ^ flag >> 3
        flag = flag ^ flag >> 2
        flag = flag ^ flag >> 1
        const hex = ethers.utils.hexlify(flag)
        // console.log(hex)
        if(hex == `0x${desiredByte}`){
          bytesGenerated = bytesGenerated + ethers.utils.hexlify(i).substring(2,4)
          return bytesGenerated
        }
      }      

    }


  for(l =0; l < bytesToGet.length ; l = l + 2){
    const bytes = bytesToGet.substring(l, l+2)
    encryptor(bytes, l)   
       
  }

  
  function hex_to_ascii(str1)
  {
   var hex  = str1.toString();
   var str = '';
   for (var n = 0; n < hex.length; n += 2) {
     str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
   }
   return str;
  }




  const winningString = hex_to_ascii(bytesGenerated)

  await bitmania.solveIt(winningString)


  });

  after( async function(){

    expect(await this.bitmania.isSolved()).to.eq(true)
  })
});
