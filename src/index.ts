import { extendConfig, extendEnvironment } from "hardhat/config";
import { HardhatPluginError } from "hardhat/plugins";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import R from "ramda";

import { HardhatSettings } from "./HardhatRuntimeSettings";
// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    // We apply our default config here. Any other kind of config resolution
    // or normalization should be placed here.
    //
    // `config` is the resolved config, which will be used during runtime and
    // you should modify.
    // `userConfig` is the config as provided by the user. You should not modify
    // it.
    //
    // If you extended the `HardhatConfig` type, you need to make sure that
    // executing this function ensures that the `config` object is in a valid
    // state for its type, including its extensions. For example, you may
    // need to apply a default value, like in this example.
    const keys = R.union(
      Object.keys(config.networks),
      Object.keys(userConfig.settings || {})
    );
    const resolved: HardhatSettings = {};
    const defaultSettings = userConfig.settings?.default;
    const allKeys: string[] = [];
    for (const k of keys) {
      if (k === "default") {
        continue;
      }
      resolved[k] = Object.assign(
        {},
        defaultSettings,
        userConfig.settings?.[k]
      );
      allKeys.push(...Object.keys(resolved[k]));
    }
    const missing: string[] = [];
    for (const k in resolved) {
      const keysFound = Object.keys(resolved[k]);
      missing.push(...R.difference(allKeys, keysFound));
    }
    const missingUniq = R.uniq(missing);
    if (missingUniq.length) {
      throw new HardhatPluginError(
        "hardhat-network-settings",
        `Missing default settings for "${missingUniq.join('", "')}"`
      );
    }

    config.settings = resolved;
  }
);

extendEnvironment((hre) => {
  // We add a field to the Hardhat Runtime Environment here.
  const userSettings = hre.config.settings;
  hre.settings = Object.assign(
    {},
    userSettings.default,
    userSettings[hre.network.name]
  );
});
