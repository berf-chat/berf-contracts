import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const BerfChat = await ethers.getContractFactory("BerfChat");
  const berfChat = await BerfChat.deploy();

  console.log("BerfChat contract deployed to:", berfChat.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });