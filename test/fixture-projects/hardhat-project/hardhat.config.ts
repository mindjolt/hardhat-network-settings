// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/demo`,
    },
  },
  settings: {
    default: {
      maxSupply: 10000,
      revenueReceiver: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    },
    rinkeby: {
      revenueReceiver: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    },
  },
};

export default config;
