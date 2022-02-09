// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";

import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the settings field", function () {
      assert.deepEqual(this.hre.settings, {
        maxSupply: 10000,
        revenueReceiver: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      });
    });
  });

  describe("HardhatConfig extension", function () {
    useEnvironment("hardhat-project");

    it("Should add settings to the config", function () {
      assert.deepEqual(this.hre.config.settings, {
        hardhat: {
          maxSupply: 10000,
          revenueReceiver: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        },
        localhost: {
          maxSupply: 10000,
          revenueReceiver: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        },
        rinkeby: {
          maxSupply: 10000,
          revenueReceiver: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
        },
      });
    });
  });
});
