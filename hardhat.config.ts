import { HardhatUserConfig } from "hardhat/types";
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: "0.8.4", settings: {} }],
  },
};

export default config;