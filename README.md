# NFT Marketplace Frontend

A modern decentralized NFT marketplace built with **Next.js (App Router)**, **RainbowKit/Wagmi**, and **Viem**. Connect your wallet, browse on-chain listings, view NFT metadata, and perform marketplace actions like **list**, **buy**, **cancel**, and **update price**.

## 🔗 Links

- **Live Demo:** [NFT Marketplace](https://nft-marketplace-chi-red.vercel.app/)
- **Smart Contract:** [0x14098c94258118087820b477bD2B9a38E3cE5371](https://sepolia.etherscan.io/address/0x14098c94258118087820b477bD2B9a38E3cE5371)
- **Contract Repo:** [Smart-Contract](https://github.com/priyanshusinghchouhan/nft-marketplace-contract)

## Features

- **Wallet connection** via RainbowKit (WalletConnect-powered)
- **Supported network**: Sepolia (configured in `src/constants/constants.ts`)
- **Marketplace actions**
  - List an NFT (with ERC-721 approval flow)
  - Buy an NFT (payable transaction)
  - Cancel your listing
  - Update listing price
- **On-chain listings + metadata**
  - Reads listing count and listing details from the marketplace contract
  - Fetches `tokenURI` and loads metadata (supports `ipfs://` via `https://ipfs.io/ipfs/`)
- **Optional mock mode** for UI demos without a contract
- **UI/UX**
  - Tailwind CSS v4 styling
  - shadcn/ui-style components (e.g. `Button`)
  - Neon/dark web3 theme

## Tech stack

- **Next.js** 16 (App Router) + **React** 19 + **TypeScript**
- **Wagmi** + **Viem** for contract reads/writes
- **RainbowKit** for wallet UX
- **@tanstack/react-query** for caching and refetching
- **Tailwind CSS** + **shadcn/ui** patterns + **Lucide** icons

## Prerequisites

- **Node.js 20+** recommended
- **npm** (this repo includes `package-lock.json`)
- A wallet (e.g. MetaMask / Rabby) connected through RainbowKit
- Some **Sepolia ETH** for gas (for listing/buying/updating)

## 📸 Screenshots

<img width="1442" height="798" alt="image" src="https://github.com/user-attachments/assets/dfd7d57a-8488-40a9-86d0-be1eb6809a16" />
<img width="1434" height="776" alt="image" src="https://github.com/user-attachments/assets/5630a887-07ec-4c57-b40d-704276405c41" />
<img width="1441" height="771" alt="image" src="https://github.com/user-attachments/assets/b729561f-bd32-410c-99c3-23249e42cd87" />


## Installation

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

## Configuration

### Network + contract address

This frontend is currently configured for **Sepolia** and a single marketplace contract address:

- `src/constants/constants.ts`
  - `SUPPORTED_CHAIN` (currently `sepolia`)
  - `MARKETPLACE_CONTRACT_ADDRESS`

If you redeploy your marketplace contract, update `MARKETPLACE_CONTRACT_ADDRESS`.

### WalletConnect / RainbowKit Project ID

RainbowKit uses a WalletConnect project id in:

- `src/app/providers.tsx` → `getDefaultConfig({ projectId: "..." })`

If you have your own WalletConnect project, replace the `projectId`.

### Remote images (Next.js)

`next.config.ts` allows images from:

- `wallpapercave.com`
- `i.pinimg.com`

If you display images from other domains using `next/image`, add them to `remotePatterns`.

## Using mock listings (no blockchain required)

For demo/testing UI without a deployed marketplace, you can toggle mock listings:

- `src/mocks/mockListings.ts` → set `USE_MOCK_DATA = true`

When mock mode is enabled, the carousel uses `MOCK_LISTINGS` instead of on-chain listing IDs.

## How the dApp works (high level)

- **Browse listings**
  - `useMarketplaceListings()` reads `getTotalListings()` from the marketplace contract.
  - The UI builds listing IDs `0..(totalListings-1)` and loads each listing via `useListing(id)`.
- **Load NFT metadata**
  - `useListing()` reads marketplace `getListing(listingId)`
  - Then reads ERC-721 `tokenURI(tokenId)` from the NFT contract
  - If the URI is `ipfs://...`, it fetches via `https://ipfs.io/ipfs/...`
- **List an NFT**
  - `ListNFTModal` collects: NFT contract address, tokenId, price (ETH)
  - `useListNFT()` checks approval:
    - ERC-721 `getApproved(tokenId)` and `isApprovedForAll(owner, marketplace)`
    - If needed, prompts wallet to `approve(marketplace, tokenId)` before calling `listNft(...)`
- **Buy / Cancel / Update**
  - `useBuyNft()` calls `buyNft(listingId)` and sends `value: parseEther(price)`
  - `useCancelListing()` calls `cancelListing(listingId)`
  - `useUpdateListingPrice()` calls `updateListingPrice(listingId, parseEther(newPrice))`

## Project structure

```text
src/
  abi/                # Marketplace + ERC-721 ABIs
  app/                # Next.js App Router pages/layout/providers
    components/       # UI sections + modals (carousel, details, list modal)
  components/ui/      # Reusable UI primitives (shadcn-style)
  constants/          # Chain + contract address config
  hooks/              # Contract read/write hooks (list/buy/cancel/update)
  mocks/              # Mock listing data + toggle
  types/              # Shared TypeScript types
public/               # Static assets (sample NFT images, icons)
```

## Troubleshooting

- **Connect button shows wrong network**
  - Make sure your wallet is on **Sepolia** (the app is configured for Sepolia only).
- **No listings shown**
  - Confirm the marketplace contract has listings (`getTotalListings() > 0`), or enable mock mode.
- **Images/metadata not loading**
  - The app fetches metadata from `tokenURI`. For `ipfs://...` it uses the `ipfs.io` gateway.
  - If your metadata/image uses a different gateway or an unsupported format, update the logic in `src/hooks/useListings.ts`.
- **Listing fails**
  - Ensure you own the NFT and the tokenId exists.
  - Ensure approval is granted (the app can prompt for `approve`, but your NFT contract must support standard ERC-721).

## Notes

- This repo is the **frontend** only; it assumes a marketplace contract already exists and is deployed.
- If you want environment-variable configuration (contract address / WalletConnect project id), you can refactor `src/constants/constants.ts` and `src/app/providers.tsx` to read from `.env.local`.


## 📄 License

MIT
