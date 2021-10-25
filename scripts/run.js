// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

const main = async () => {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const gameContractFactory = await hre.ethers.getContractFactory('HalloweenHorror');
  const gameContract = await gameContractFactory.deploy(['Amanda', 'Derik', 'Jeff'], ['https://halloweenhorror.xyz/images/people/amanda.png', 'https://halloweenhorror.xyz/images/people/derik.png', 'https://halloweenhorror.xyz/images/people/jeff.png'], [300, 100, 100], [10, 25, 21]);

  await gameContract.deployed();

  console.log('Halloween Horror deployed to:', gameContract.address);

  let txn;

  // Mint with an index of 2
  txn = await gameContract.mintCharacter(2);
  await txn.wait();

  // get the value of the NFT's URI
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log('Token URI: ', returnedTokenUri);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const runMain = async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
