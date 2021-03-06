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
  const gameContract = await gameContractFactory.deploy(
    ['Amanda', 'Derik', 'Jeff'],
    ['https://halloweenhorror.xyz/images/people/amanda.svg', 'https://halloweenhorror.xyz/images/people/derik.svg', 'https://halloweenhorror.xyz/images/people/jeff.svg'],
    [300, 100, 100],
    [10, 25, 21],
    'Werewolf', // Horror Name
    'https://halloweenhorror.xyz/images/horrors/werewolf.svg',
    420, // Max health
    69 // Damage
  );

  await gameContract.deployed();

  console.log('Halloween Horror deployed to:', gameContract.address);

  // let txn;

  // // Mint all contracts
  // txn = await gameContract.mintCharacter(0);
  // await txn.wait();
  // console.log('Minted Amanda');

  // txn = await gameContract.attackHorror();
  // await txn.wait();

  // txn = await gameContract.attackHorror();
  // await txn.wait();

  // console.log('Done deploying');
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
