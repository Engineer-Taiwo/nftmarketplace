# NFT Marketplace

A full-stack decentralized NFT marketplace built from scratch with **Next.js, TypeScript, Solidity, Foundry, Wagmi, RainbowKit, rindexer, PostgreSQL, GraphQL, and Ethereum Sepolia**.

The application enables users to:

* Mint NFTs
* List NFTs for sale
* Purchase listed NFTs
* Browse recently listed NFTs
* Make payments using USDC
* Connect Web3 wallets
* Query indexed blockchain data through GraphQL
* Perform address compliance checks
* Interact with smart contracts deployed on Ethereum Sepolia

The project combines an on-chain smart-contract layer with an off-chain indexing and API layer to provide a complete Web3 application architecture.

## Architecture

The application is composed of three major layers:

```text
                         Ethereum Sepolia
                               │
                               │
                     ┌─────────▼─────────┐
                     │  Solidity Smart   │
                     │    Contracts      │
                     │                   │
                     │ • NFT Marketplace │
                     │ • CakeNFT         │
                     │ • MoodNFT         │
                     │ • USDC            │
                     └─────────┬─────────┘
                               │
                         Contract Events
                               │
                               ▼
                     ┌───────────────────┐
                     │     rindexer      │
                     │                   │
                     │ Blockchain Indexer│
                     └─────────┬─────────┘
                               │
                               ▼
                     ┌───────────────────┐
                     │    PostgreSQL     │
                     │     Database      │
                     └─────────┬─────────┘
                               │
                               ▼
                     ┌───────────────────┐
                     │   GraphQL API     │
                     │                   │
                     │ localhost:3001    │
                     └─────────┬─────────┘
                               │
                               ▼
                     ┌───────────────────┐
                     │    Next.js App    │
                     │                   │
                     │ TypeScript        │
                     │ Wagmi             │
                     │ RainbowKit        │
                     └───────────────────┘
                               │
                               ▼
                           MetaMask
```

### On-chain layer

The smart contracts are deployed to **Ethereum Sepolia**, Ethereum's public testnet for application development. Sepolia uses chain ID `11155111`.

The contracts handle the core trust-sensitive operations:

* NFT minting
* NFT ownership
* NFT listing
* NFT purchases
* USDC payments
* Marketplace state

### Indexing layer

Instead of querying the blockchain directly for every marketplace operation, the application uses **rindexer** to listen for blockchain events and persist relevant data in PostgreSQL.

The indexed data is exposed through a GraphQL API which the Next.js frontend consumes.

This provides a much more practical query layer for operations such as:

* Recently listed NFTs
* NFT listings
* NFT ownership-related marketplace information
* Historical marketplace events

### Frontend layer

The frontend is implemented with:

* Next.js
* TypeScript
* Wagmi
* RainbowKit
* React
* GraphQL

Wagmi handles blockchain interactions while RainbowKit provides the wallet-connection interface.

---

# Features

## NFT Minting

Users can mint NFTs through the NFT smart contracts.

## NFT Listing

NFT owners can list their NFTs on the marketplace by interacting with the marketplace smart contract.

## NFT Buying

Users can purchase NFTs listed by other users.

The purchase flow involves blockchain transactions and, where applicable, USDC payment.

## Recently Listed NFTs

The frontend retrieves indexed marketplace data through GraphQL and displays recently listed NFTs.

Rather than repeatedly scanning the blockchain from the browser, the application queries the indexed PostgreSQL-backed GraphQL API.

## USDC Payments

The marketplace supports USDC-based payments for NFT purchases.

The USDC contract used by the application is deployed on Ethereum Sepolia.

## Address Compliance

The application includes an optional compliance layer that can screen wallet addresses before allowing relevant operations.

Compliance checking can be enabled through the environment configuration.

## Wallet Integration

Users can connect their wallets through RainbowKit and Wagmi.

Supported wallet providers depend on the configured RainbowKit/WalletConnect setup.

## Blockchain Indexing

rindexer listens for relevant smart-contract events on Ethereum Sepolia and indexes them into PostgreSQL.

The indexed information is then made available through GraphQL.

---

# Technology Stack

| Layer                   | Technology            |
| ----------------------- | --------------------- |
| Frontend                | Next.js               |
| Language                | TypeScript            |
| Web3                    | Wagmi                 |
| Wallet UI               | RainbowKit            |
| Smart Contracts         | Solidity              |
| Smart Contract Tooling  | Foundry               |
| Blockchain              | Ethereum Sepolia      |
| Blockchain Indexer      | rindexer              |
| Database                | PostgreSQL            |
| API                     | GraphQL               |
| Database Infrastructure | Docker                |
| Token                   | USDC                  |
| Compliance              | Circle Compliance API |
| Package Manager         | pnpm                  |

---

# Getting Started

## Requirements

Install the following tools before running the project.

### Node.js

Install Node.js from the official Node.js website.

Verify the installation:

```bash
node --version
```

### pnpm

Install pnpm and verify:

```bash
pnpm --version
```

### Git

Verify Git:

```bash
git --version
```

### Foundry

Foundry is required for the smart-contract development and deployment workflow.

Verify:

```bash
forge --version
```

### Docker

Docker is required for the PostgreSQL database used by the indexer.

Verify:

```bash
docker --version
```

### rindexer

rindexer is responsible for indexing blockchain events and exposing the indexed data through GraphQL.

Verify:

```bash
rindexer --version
```

The project was developed and tested with rindexer `0.41.0`.

---

# Environment Variables

Create a `.env.local` file in the root of the Next.js application.

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

GRAPHQL_API_URL=http://localhost:3001/graphql

ENABLE_COMPLIANCE_CHECK=false

CIRCLE_API_KEY=your_circle_api_key

NEXT_PUBLIC_SEPOLIA_RPC_URL=your_sepolia_rpc_url
```

### `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

The WalletConnect project ID used by RainbowKit.

Create one through WalletConnect Cloud.

### `GRAPHQL_API_URL`

The URL of the GraphQL API exposed by the rindexer indexer.

For local development:

```env
GRAPHQL_API_URL=http://localhost:3001/graphql
```

### `ENABLE_COMPLIANCE_CHECK`

Controls whether address compliance checking is enabled.

```env
ENABLE_COMPLIANCE_CHECK=false
```

Set it to:

```env
ENABLE_COMPLIANCE_CHECK=true
```

to enable compliance checks.

### `CIRCLE_API_KEY`

API key used when compliance checking is enabled.

Do not commit this value to Git.

### `NEXT_PUBLIC_SEPOLIA_RPC_URL`

The Ethereum Sepolia execution-layer RPC endpoint used by the application and/or deployment tooling.

For example:

```env
NEXT_PUBLIC_SEPOLIA_RPC_URL=YOUR_SEPOLIA_RPC_ENDPOINT
```

Use your own provider endpoint from Chainstack, Alchemy, Infura, or another Ethereum RPC provider.

**Do not commit private RPC credentials or API keys.**

---

# Setup

Clone the repository and install dependencies:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd nft-marketplace
pnpm install
```

Unlike the original local-development setup, this implementation uses **Ethereum Sepolia rather than an Anvil blockchain**.

You therefore do **not** need to start:

```bash
pnpm anvil
```

to run the deployed marketplace.

---

# Configure MetaMask for Ethereum Sepolia

Add or select the Ethereum Sepolia network in MetaMask.

| Setting  | Value                     |
| -------- | ------------------------- |
| Network  | Ethereum Sepolia          |
| Chain ID | `11155111`                |
| Currency | Sepolia ETH               |
| RPC URL  | Your Sepolia RPC endpoint |

Ethereum's documentation identifies Sepolia as the recommended public testnet for application development.

You will need Sepolia ETH to pay transaction gas.

---

# Getting Sepolia ETH

Because Sepolia is a testnet, you can obtain test ETH from a Sepolia faucet.

Do not use real ETH for testing the application.

Ethereum maintains a list of Sepolia faucets and testnet resources.

---

# PostgreSQL / Docker Configuration

The indexer uses PostgreSQL to persist blockchain data.

Create the environment file used by the indexer:

```text
marketplaceIndexer/.env
```

Add:

```env
DATABASE_URL=postgresql://postgres:rindexer@localhost:5440/postgres
POSTGRES_PASSWORD=rindexer
```

The PostgreSQL instance is managed through Docker.

Before starting the indexer, make sure Docker Desktop is running.

You can verify Docker with:

```bash
docker --version
```

and:

```bash
docker ps
```

---

# Running the Indexer

Start the rindexer indexer:

```bash
rindexer start indexer
```

The indexer connects to Ethereum Sepolia, listens for the configured smart-contract events, and stores indexed information in PostgreSQL.

The GraphQL API is then available at:

```text
http://localhost:3001/graphql
```

The frontend uses this endpoint through:

```env
GRAPHQL_API_URL=http://localhost:3001/graphql
```

---

# Running the Next.js Application

After Docker/PostgreSQL and the indexer are running, start the frontend:

```bash
pnpm run dev
```

The Next.js development server will normally be available at:

```text
http://localhost:3000
```

Open the application in your browser and connect MetaMask using the **Ethereum Sepolia** network.

---

# Running the Complete Application

The development environment consists of:

```text
Ethereum Sepolia
       │
       ▼
   rindexer
       │
       ▼
  PostgreSQL
       │
       ▼
   GraphQL API
       │
       ▼
  Next.js App
```

Start Docker first.

Then start the indexer:

```bash
rindexer start indexer
```

Then start the frontend:

```bash
pnpm run dev
```

The blockchain itself does not need to be started locally because the application uses Ethereum Sepolia.

---

# Database Reset

If the indexed database needs to be rebuilt, reset the indexer's PostgreSQL data using:

```bash
pnpm run reset-indexer
```

This removes the existing indexed database state so that the indexer can rebuild the data from the configured blockchain starting point.

---

# Smart Contracts

The marketplace is powered by Solidity smart contracts developed and deployed using Foundry.

The primary contracts include:

### NFT Marketplace

Responsible for:

* Creating marketplace listings
* Tracking listed NFTs
* Processing purchases
* Handling marketplace payments
* Emitting events consumed by the indexer

### CakeNFT

NFT contract used for minting and managing marketplace NFTs.

### MoodNFT

Additional NFT contract used within the application.

### USDC

ERC-20 token used for marketplace payments.

---

# Sepolia Contract Addresses

The following addresses correspond to the contracts deployed for the Ethereum Sepolia deployment.


```text
USDC:
0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238

NFT Marketplace:
0x14AE60F5ba60de5803E081F1b03E91BD8309D342

CakeNFT:
0xEA950C4B486484396cC88Bbf10b8cdac5bf28602

MoodNFT:
0x0Df84913b62Aa873b1C18F0672422572fFCF05Db
```

These addresses must match the addresses configured in:

* The frontend
* The rindexer configuration
* The smart-contract deployment configuration
* Any contract ABIs/configuration used by the application

**The old Anvil addresses are intentionally not used here because they only exist on the local Anvil chain.**

---

# Blockchain Configuration

The application targets:

```text
Network: Ethereum Sepolia
Chain ID: 11155111
```

The frontend's Wagmi configuration should therefore include Sepolia rather than Anvil for the production/testnet deployment.

For example:

```typescript
import { sepolia } from "wagmi/chains";

const config = getDefaultConfig({
    appName: "NFT Marketplace",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [sepolia],
});
```

The exact configuration may differ depending on the application's provider setup.

---

# Indexing Architecture

One of the key architectural components of the application is the blockchain indexing pipeline.

When a user performs an operation such as listing an NFT:

```text
User
 │
 │ Transaction
 ▼
MetaMask
 │
 ▼
Ethereum Sepolia
 │
 │ Marketplace Event
 ▼
rindexer
 │
 ▼
PostgreSQL
 │
 ▼
GraphQL
 │
 ▼
Next.js
 │
 ▼
Recently Listed NFTs
```

This separates **blockchain state** from **application-query state**.

The blockchain remains the authoritative source of ownership and marketplace transactions, while PostgreSQL provides an efficient indexed representation of the events required by the frontend.

---

# GraphQL

The frontend communicates with the indexer through GraphQL.

Local GraphQL endpoint:

```text
http://localhost:3001/graphql
```

The GraphQL layer allows the frontend to request exactly the marketplace information it needs instead of repeatedly querying individual blockchain contracts.

Typical data queried includes:

* NFT listings
* NFT metadata references
* Listing prices
* Token IDs
* NFT contract addresses
* Marketplace events
* Recently listed NFTs

---

# Compliance

The marketplace includes an optional address-compliance layer.

When enabled:

```env
ENABLE_COMPLIANCE_CHECK=true
```

wallet addresses can be checked before relevant marketplace operations are completed.

The compliance functionality is integrated through Circle's API.

Keep API credentials server-side and never expose private API keys in client-side code.

---

# Project Structure

A simplified representation of the project architecture:

```text
nft-marketplace/
│
├── app/
│   ├── ...
│   └── ...
│
├── components/
│   ├── ...
│   └── ...
│
├── contracts/
│   ├── ...
│   └── ...
│
├── marketplaceIndexer/
│   ├── ...
│   └── .env
│
├── public/
│
├── scripts/
│
├── package.json
├── foundry.toml
├── next.config.*
└── README.md
```

The exact structure may vary as the project evolves.

---

# Development Workflow

The project follows a Web3 application development workflow:

### 1. Smart-contract development

Contracts are written in Solidity and developed/tested using Foundry.

### 2. Deployment

Contracts are deployed to Ethereum Sepolia.

### 3. Event emission

Marketplace interactions emit blockchain events.

### 4. Indexing

rindexer listens for the configured events and persists relevant information in PostgreSQL.

### 5. GraphQL

The indexed data is exposed through the rindexer GraphQL endpoint.

### 6. Frontend

Next.js queries the GraphQL API while Wagmi handles direct blockchain interactions.

### 7. Wallet

Users interact with the application through MetaMask or another compatible Web3 wallet.

---

# Why Sepolia Instead of Anvil?

During development, Anvil can provide a convenient local Ethereum environment.

However, the deployed version of this marketplace uses **Ethereum Sepolia**.

This means:

* Smart contracts exist on a real public Ethereum test network.
* Wallets connect to Sepolia.
* Transactions are broadcast to Sepolia.
* rindexer indexes Sepolia events.
* PostgreSQL stores the indexed application data.
* The frontend consumes the indexed data through GraphQL.

There is therefore no dependency on a locally running Anvil chain for the deployed/testnet version.

---

# Security Notes

Never commit secrets to the repository.

The following should remain private:

```text
CIRCLE_API_KEY
Wallet private keys
Deployment private keys
RPC provider API keys
WalletConnect secrets
```

Use environment variables and keep `.env`, `.env.local`, and other secret-containing files in `.gitignore`.

---

# Project Highlights

This project demonstrates the integration of several layers of modern Web3 application development:

* Solidity smart-contract engineering
* Foundry-based contract development
* Ethereum Sepolia deployment
* ERC-20 token payments
* NFT minting and ownership
* NFT marketplace mechanics
* Wallet integration
* Wagmi
* RainbowKit
* Blockchain event indexing
* rindexer
* PostgreSQL
* GraphQL
* Next.js
* TypeScript
* Docker
* Address compliance

Rather than treating the frontend, smart contracts, indexer, and database as isolated components, the project demonstrates how these systems work together to form a complete decentralized application.

---

# Author

**Taiwo Oladokun**

Full-Stack Blockchain Engineer

Building decentralized applications across the smart-contract, backend/indexing, and frontend layers.
