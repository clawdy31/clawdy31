# Mini Base App

A lightweight React dApp for Base network with wallet connection and ETH transfers.

## Features

- 🔗 Wallet connection (MetaMask, Rabby, WalletConnect)
- 💰 Display ETH balance on Base
- 📤 Send ETH transactions
- 🔗 Quick links to Base ecosystem

## Setup

```bash
# Navigate to project
cd mini-base-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## Networks Supported

- **Base Mainnet** (chainId: 8453)
- **Base Sepolia** (testnet)

## Dependencies

- React 18
- Wagmi v2 (wallet & chain management)
- RainbowKit (wallet UI)
- Viem (ETH operations)
- TanStack Query (data fetching)
- Vite (build tool)

## Notes

- Auto-connects to Base network when you connect wallet
- Make sure your wallet is set to Base or will auto-switch
- Get testnet ETH from faucet before testing on Base Sepolia

## Useful Links

- Base Docs: https://docs.base.org
- Base Bridge: https://bridge.base.org
- BaseScan: https://basescan.org
