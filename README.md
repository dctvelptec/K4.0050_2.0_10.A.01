## Donation Service

## Documentations

- https://book.getfoundry.sh/
- https://vite.dev/guide/#scaffolding-your-first-vite-project
- https://v5.daisyui.com/docs/intro/
- https://docs.family.co/connectkit/getting-started
- https://wagmi.sh/react/getting-started
- https://viem.sh/docs/getting-started

## Quick Setup

Truffle Alternative: https://book.getfoundry.sh/forge/  
Ganache Alternative: https://book.getfoundry.sh/anvil/  
Web3JS Alernative: https://docs.family.co/connectkit basierend auf https://wagmi.sh/ basierend auf https://viem.sh/

### Smart Contracts

1. Start local node `anvil`
2. Deploy contracts to local node `forge create --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --rpc-url 127.0.0.1:8545 --broadcast ./src/Donations.sol:Donations` (truffle alternative)

### Frontend

1. `cd frontend`
2. Installieren `yarn`
3. Serve `yarn dev`
4. Mit Wallet verbinden

### Foundry Information

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
