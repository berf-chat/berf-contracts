import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const BerfChatStorage = await ethers.getContractFactory("BerfChatStorage");
  const berfChatStorage = await BerfChatStorage.deploy();

  console.log("Berf Chat contract deployed to:", berfChatStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });