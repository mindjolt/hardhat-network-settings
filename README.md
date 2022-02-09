# hardhat-network-settings

Per network settings for your hardhat project.

## What

This plugin adds a field `settings` to the `HardhatRuntimeEnvironment` containing settings
specific to the current network in use. This simplifies chain-specific parameterization of
project scripts and tasks.

## Installation

```bash
npm install hardhat-network-settings
```

Import the plugin in your `hardhat.config.js`:

```js
require('hardhat-network-settings');
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import 'hardhat-network-settings';
```


## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding a `settings` field
whose contents are set to the type is `ExampleHardhatRuntimeEnvironmentField`.

## Configuration

This plugin extends `HardhatUserConfig` with an optional `settings` field.

This is an example of how to set it:

```js
{
  settings: {
    default: {
      maxSupply: 10000,
    },
    hardhat: {
      maxSupply: 100,
      revenueReceiver: '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
    },
    rinkeby: {
      revenueReceiver: '0xCfE2cd1e76Ef398B137f9eC8031B87982e18E4AC',
    },
    mainnet: {
      revenueReceiver: '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
    }
  }
}
```

During execution, the `hardhat.settings` field will contain the configuration
values for the currently executing network. Any missing entries will be
set to the values in the `default` section, if any.

## Usage

There are no additional steps you need to take for this plugin to work.

Install it and access `settings` through the Hardhat Runtime Environment anywhere
you need it (tasks, scripts, tests, etc).
