# 🎨 NFT Marketplace Frontend

<div align="center">

**A modern, full-featured NFT marketplace built with Next.js, Wagmi, and RainbowKit**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Wagmi](https://img.shields.io/badge/Wagmi-2-purple?style=for-the-badge)](https://wagmi.sh/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🌐 Live Demo](https://nft-marketplace-chi-red.vercel.app/) • [📄 Smart Contract](https://sepolia.etherscan.io/address/0x14098c94258118087820b477bD2B9a38E3cE5371) • [💻 Contract Repo](https://github.com/priyanshusinghchouhan/nft-marketplace-contract) • [✏️ Backend Repo](https://github.com/priyanshusinghchouhan/nft-marketplace-indexer)

</div>

---

## ✨ Overview

A fully decentralized NFT marketplace running on **Sepolia testnet** that enables users to mint, list, buy, and manage NFTs through a beautiful, modern web interface. Built with cutting-edge web3 technologies and featuring a complete backend indexer for real-time event processing.

### 🎯 Key Highlights

- 🔐 **Non-custodial** - All transactions happen directly on-chain
- ⚡ **Real-time updates** - Backend indexer syncs blockchain events instantly
- 🎨 **Modern UI/UX** - Beautiful dark theme with neon accents
- 📱 **Responsive** - Works seamlessly on desktop and mobile
- 🔄 **Smart caching** - Optimized data fetching with React Query

---

## 🚀 Features

### 🛍️ Marketplace Actions
- ✅ **Browse NFT Listings** - Discover active listings in a beautiful carousel
- ✅ **List NFTs** - List your NFTs for sale with automatic approval flow
- ✅ **Buy NFTs** - Purchase NFTs with one-click transactions
- ✅ **Cancel Listings** - Remove your listings anytime
- ✅ **Update Prices** - Modify listing prices on the fly

### 👤 User Features
- ✅ **My Collections** - View all your owned NFTs in one place
- ✅ **Manage Listings** - Cancel or update prices directly from My Collections
- ✅ **Recent Activity Feed** - Track marketplace events (mints, listings, sales)
- ✅ **Mint Integration** - Link to external minting dapp for seamless flow

### 🔧 Technical Features
- ✅ **Wallet Integration** - RainbowKit with WalletConnect support
- ✅ **IPFS Metadata** - Automatic resolution of `ipfs://` URIs
- ✅ **Image Caching** - Stable placeholder images for consistent UX
- ✅ **Transaction Tracking** - Real-time status updates
- ✅ **Error Handling** - Graceful error states and recovery

---

## 🏗️ Architecture

This frontend connects to a **full-stack NFT marketplace**:

```
┌─────────────────┐      ┌──────────────┐      ┌─────────────┐
│  Smart Contract │ ───▶ │  Backend     │ ───▶ │  Frontend   │
│  (Sepolia)      │      │  Indexer     │      │  (Next.js)  │
└─────────────────┘      └──────────────┘      └─────────────┘
     Events                   PostgreSQL           React UI
```

- **Smart Contracts** handle on-chain logic (listing, buying, canceling)
- **Backend Indexer** processes blockchain events and stores in PostgreSQL
- **Frontend** fetches indexed data via REST API and displays to users

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Web3**: Wagmi + Viem + RainbowKit
- **State Management**: React Query (@tanstack/react-query)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Icons**: Lucide React

### Backend Integration
- **API Client**: Axios
- **Data Format**: REST API (JSON)

---

## 📋 Prerequisites

- **Node.js** 20+ (recommended)
- **npm** or **yarn**
- **Web3 Wallet** (MetaMask, Rabby, or any WalletConnect-compatible wallet)
- **Sepolia ETH** for gas fees ([Get from faucets](https://sepoliafaucet.com/))

---

## 🚀 Quick Start

### 1️⃣ Clone & Install

```bash
git clone <your-repo-url>
cd nft-marketplace-frontend
npm install
```

### 2️⃣ Configure Environment (Optional)

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5173
```

Or update `src/constants/constants.ts` and `src/app/providers.tsx` directly.

### 3️⃣ Run Development Server

```bash
npm run dev
```

### 4️⃣ Open Browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage Guide

### Connecting Your Wallet

1. Click **Connect Wallet** in the navigation bar
2. Select your preferred wallet (MetaMask, WalletConnect, etc.)
3. Switch to **Sepolia testnet** in your wallet
4. Approve the connection

### Listing an NFT

1. Navigate to **My Collections** from the navbar
2. Find an unlisted NFT
3. Click **List for sale**
4. Enter the price in ETH
5. Approve the transaction (if needed)
6. Confirm the listing transaction

### Buying an NFT

1. Browse listings on the homepage
2. Click on any NFT card
3. Review details in the modal
4. Click **Buy Now**
5. Confirm the transaction in your wallet

### Managing Your Listings

1. Go to **My Collections**
2. Find a listed NFT
3. Click **Manage listing**
4. Choose to **Cancel** or **Update Price**

---

## 📁 Project Structure

```
nft-marketplace-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── components/         # Page components
│   │   │   ├── navigation.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── nft-carousel.tsx
│   │   │   ├── NFTDetailModal.tsx
│   │   │   ├── ListNftModal.tsx
│   │   │   ├── OwnedNFTCard.tsx
│   │   │   └── RecentActivityPanel.tsx
│   │   ├── my-nfts/           # My Collections page
│   │   ├── recent-activity/   # Recent Activity page
│   │   ├── about/             # About page
│   │   └── page.tsx           # Homepage
│   ├── components/ui/         # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   │   ├── useListNft.ts
│   │   ├── useBuyNft.ts
│   │   ├── useCancelListing.ts
│   │   ├── useUpdateListingPrice.ts
│   │   ├── useUserNFTs.ts
│   │   ├── useListings.ts
│   │   ├── useRecentActivity.ts
│   │   └── useResolvedNFTImage.ts
│   ├── lib/                   # Utility libraries
│   │   ├── api/              # API clients
│   │   └── utils/            # Helper functions
│   ├── types/                 # TypeScript types
│   ├── constants/             # App constants
│   ├── abi/                   # Contract ABIs
│   └── mocks/                 # Mock data
├── public/                     # Static assets
└── package.json
```

---

## 🎨 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with marketplace carousel and hero section |
| `/my-nfts` | View and manage your owned NFTs |
| `/recent-activity` | Browse recent marketplace activity feed |
| `/about` | About page with faucet links and architecture info |

---

## ⚙️ Configuration

### Network & Contract

Edit `src/constants/constants.ts`:

```typescript
export const SUPPORTED_CHAIN = sepolia;
export const MARKETPLACE_CONTRACT_ADDRESS = "0x...";
```

### WalletConnect Project ID

Edit `src/app/providers.tsx`:

```typescript
getDefaultConfig({
  projectId: "your-walletconnect-project-id",
  // ...
});
```

### API Endpoint

Set `NEXT_PUBLIC_API_URL` in `.env.local` or update `src/lib/api/client.ts`.

---

## 🧪 Mock Mode

Test the UI without blockchain interaction:

1. Open `src/mocks/mockListings.ts`
2. Set `USE_MOCK_DATA = true`
3. The app will use mock data instead of on-chain listings

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `http://localhost:3000` |
| `npm run build` | Create production build |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint for code quality |

---

## 🔍 How It Works

### Data Flow

1. **Smart Contract Events** → Emitted on-chain (NFTListed, NFTSold, etc.)
2. **Backend Indexer** → Listens to events and stores in PostgreSQL
3. **REST API** → Exposes `/marketplace/listings`, `/users/:wallet/nfts`, `/activity/recent`
4. **Frontend** → Fetches via React Query, caches, and displays

### Transaction Flow

1. User initiates action (list/buy/cancel/update)
2. Wagmi prepares transaction
3. Wallet prompts for signature
4. Transaction sent to network
5. Wait for confirmation
6. React Query invalidates cache
7. UI updates automatically

---

## 🐛 Troubleshooting

### Wallet Connection Issues

- **Wrong network**: Ensure your wallet is on Sepolia testnet
- **Connection fails**: Try refreshing the page or reconnecting
- **Transaction pending**: Check your wallet for pending transactions

### No Listings Showing

- Check if marketplace contract has active listings
- Verify backend API is running and accessible
- Check browser console for API errors
- Try enabling mock mode for testing

### Images Not Loading

- Verify `tokenURI` is accessible
- Check IPFS gateway availability (`ipfs.io`)
- Ensure image URLs are whitelisted in `next.config.ts`

### Transaction Failures

- Ensure you have enough Sepolia ETH for gas
- Verify you own the NFT (for listing)
- Check contract approval status
- Review transaction details in Etherscan

---

## 📸 Screenshots

<div align="center">

<img width="1442" height="798" alt="Home Page" src="https://github.com/user-attachments/assets/53b9ead4-36c4-4332-a0bd-a107091ff2f0" />

<img width="1398" height="782" alt="Marketplace" src="https://github.com/user-attachments/assets/db7f8dbb-59ed-4ac0-8a75-c1fd01dd7316" />

<img width="1434" height="669" alt="My Collections" src="https://github.com/user-attachments/assets/47873de8-de72-4ac9-8d56-cb73af1b4b1f" />

<img width="1375" height="463" alt="My Collections" src="https://github.com/user-attachments/assets/8b1b402d-5f8e-4f02-a627-44a4702cd996" />

<img width="1360" height="742" alt="NFT Detail" src="https://github.com/user-attachments/assets/610c371d-ebc5-45e9-89a4-8105a1e2eb4a" />

<img width="1350" height="709" alt="NFT Detail" src="https://github.com/user-attachments/assets/b65d05c3-7aa7-4ddc-84c4-538ebb164c9e" />

<img width="1417" height="749" alt="Recent Activity" src="https://github.com/user-attachments/assets/6eab6c7f-f591-40e3-96c8-daf7336bb806" />

<img width="1401" height="725" alt="More" src="https://github.com/user-attachments/assets/39e44d63-0693-471b-97ba-90f91a72285a" />



</div>

---

## 📝 Notes

- All images are placeholders; real NFT metadata integration coming soon
- Currently deployed on Sepolia testnet
- Production deployment requires custom WalletConnect project ID
- Environment variables can be moved to `.env.local` for better config management

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/) for web3 utilities
- [RainbowKit](https://www.rainbowkit.com/) for wallet connection UX
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

<div align="center">

**Built with ❤️ for the web3 community**

⭐ Star this repo if you find it helpful!

</div>
