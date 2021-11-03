import { HardhatUserConfig } from "hardhat/types";
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import "@nomiclabs/hardhat-waffle";
import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });

// NEED TO FIRGURE OUT WHY DOING IT
// THE WAY OPTIMISM WAS SUGGESTING
// WAS ERRORING OUT
// import '@eth-optimism/hardhat-ovm';

const infuraApiKey = process.env.INFURA_ETHEREUM;
const accountOnePrivKey = process.env.ACCOUNT_ONE_PRIVATE_KEY;
const accountTwoPrivKey = process.env.ACCOUNT_TWO_PRIVATE_KEY;
const accountThreePrivKey = process.env.ACCOUNT_THREE_PRIVATE_KEY;
const accountFourPrivKey = process.env.ACCOUNT_FOUR_PRIVATE_KEY;


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraApiKey}`,
      accounts: [`0x${accountOnePrivKey}`, `0x${accountTwoPrivKey}`, `0x${accountThreePrivKey}`, `0x${accountFourPrivKey}`]
    },
    optimistic: {
      url: 'https://kovan.optimism.io',
      accounts: [`0x${accountOnePrivKey}`, `0x${accountTwoPrivKey}`, `0x${accountThreePrivKey}`, `0x${accountFourPrivKey}`] /*,
      gasPrice: 15000000, // required
      ovm: true // required
      */
    },
  },
  solidity: {
    compilers: [{ version: "0.8.4", settings: {} }],
  },
};

export default config;