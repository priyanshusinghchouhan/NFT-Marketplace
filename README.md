# NFT Marketplace Frontend

A modern NFT marketplace frontend built with **Next.js (App Router)**, **RainbowKit/Wagmi**, and **Viem**. Connect your wallet, browse on-chain listings, view NFT metadata, and perform marketplace actions: **list**, **buy**, **cancel**, and **update price**.

---

## What does this app do?

This is the **web app** for the NFT marketplace. You connect your wallet (e.g. MetaMask), switch to **Sepolia** (testnet), and then you can:

- **Browse** – See all active listings from the marketplace contract.
- **List** – List your own NFT for sale (with approval flow if needed).
- **Buy** – Purchase a listed NFT by paying the listed price in ETH.
- **Cancel** – Remove your listing.
- **Update price** – Change the price of your listing.

The app reads listing data and NFT metadata (including `ipfs://` URIs) and talks to your wallet to sign transactions. It can also run in **mock mode** so you can try the UI without a deployed contract.

**Note:** Current images shown are placeholders; minting demo NFTs with real metadata is in progress.

---

## Links

- **Live Demo:** [NFT Marketplace](https://nft-marketplace-chi-red.vercel.app/)
- **Smart Contract:** [0x14098c94258118087820b477bD2B9a38E3cE5371](https://sepolia.etherscan.io/address/0x14098c94258118087820b477bD2B9a38E3cE5371)
- **Contract Repo:** [Smart-Contract](https://github.com/priyanshusinghchouhan/nft-marketplace-contract)

---

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

---

## Tech stack

- **Next.js** 16 (App Router) + **React** 19 + **TypeScript**
- **Wagmi** + **Viem** for contract reads/writes
- **RainbowKit** for wallet UX
- **@tanstack/react-query** for caching and refetching
- **Tailwind CSS** + **shadcn/ui** patterns + **Lucide** icons

---

## Prerequisites

- **Node.js** 20+ recommended
- **npm** (this repo includes `package-lock.json`)
- A wallet (e.g. MetaMask / Rabby) that works with RainbowKit
- Some **Sepolia ETH** for gas (for listing/buying/updating)

---

## Quick start in 3 steps

**1. Install dependencies**

```bash
npm install
```

**2. Run the dev server**

```bash
npm run dev
```

**3. Open in browser**

Open [http://localhost:3000](http://localhost:3000). Connect your wallet and switch to **Sepolia** to use the marketplace.

---

## Screenshots

<img width="1442" height="798" alt="image" src="https://github.com/user-attachments/assets/dfd7d57a-8488-40a9-86d0-be1eb6809a16" />
<img width="1442" height="798" alt="image" src="https://github.com/user-attachments/assets/b471d9fa-6b5a-4ef0-aa98-668d469a4363" />
<img width="1442" height="798" alt="image" src="https://github.com/user-attachments/assets/38fd4192-9ab8-42a7-9fa0-a9ddfa6e9fba" />
<img width="1470" height="786" alt="image" src="https://github.com/user-attachments/assets/2ecfb6f3-64bc-4ee3-9039-09f32fb24130" />

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Next.js) at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `npm run build`) |
| `npm run lint` | Run ESLint |

---

## Configuration

All of these are optional to get started; change them when you use a different network, contract, or WalletConnect project.

| What to configure | Where | Description |
|-------------------|-------|-------------|
| **Network** | `src/constants/constants.ts` | `SUPPORTED_CHAIN` (e.g. `sepolia`) |
| **Marketplace contract** | `src/constants/constants.ts` | `MARKETPLACE_CONTRACT_ADDRESS` – update if you deploy a new contract |
| **WalletConnect project ID** | `src/app/providers.tsx` | `getDefaultConfig({ projectId: "..." })` – use your own for production |
| **Remote images (Next.js)** | `next.config.ts` | Domains for `next/image` (e.g. `wallpapercave.com`, `i.pinimg.com`). Add more if you load images from other domains. |

---

## Using mock listings (no blockchain required)

To try the UI without a deployed marketplace or wallet:

- Open `src/mocks/mockListings.ts` and set **`USE_MOCK_DATA = true`**.
- The carousel will use `MOCK_LISTINGS` instead of on-chain listing IDs.

---

## How the dApp works (high level)

The app reads from the marketplace contract and your wallet, and sends transactions when you list, buy, cancel, or update price.

- **Browse listings** – `useMarketplaceListings()` reads `getTotalListings()` from the contract; the UI loads each listing via `useListing(id)`.
- **Load NFT metadata** – `useListing()` gets `getListing(listingId)` from the marketplace, then reads `tokenURI(tokenId)` from the NFT contract. For `ipfs://` URIs it fetches via `https://ipfs.io/ipfs/...`.
- **List an NFT** – `ListNFTModal` collects NFT contract, tokenId, and price. `useListNFT()` checks approval (`getApproved` / `isApprovedForAll`) and can prompt for `approve` before calling `listNft(...)`.
- **Buy / Cancel / Update** – `useBuyNft()` calls `buyNft(listingId)` with `value: parseEther(price)`; `useCancelListing()` and `useUpdateListingPrice()` call the matching contract functions.

---

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

---

## Troubleshooting

- **Connect button shows wrong network**  
  Make sure your wallet is on **Sepolia**; the app is configured for Sepolia only.

- **No listings shown**  
  Confirm the marketplace contract has listings (`getTotalListings() > 0`), or enable mock mode in `src/mocks/mockListings.ts`.

- **Images/metadata not loading**  
  The app fetches metadata from `tokenURI`. For `ipfs://` it uses the `ipfs.io` gateway. If you use another gateway or format, update the logic in `src/hooks/useListings.ts`.

- **Listing fails**  
  Ensure you own the NFT and the tokenId exists. Ensure approval is granted; the app can prompt for `approve`, but your NFT contract must support standard ERC-721.

---

## Notes

- Current images shown are placeholders; working on minting demo NFTs with real metadata.
- For environment-based config (contract address, WalletConnect project id), you can refactor `src/constants/constants.ts` and `src/app/providers.tsx` to read from `.env.local`.

---

## License

MIT
