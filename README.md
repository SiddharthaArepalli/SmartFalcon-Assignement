# Hyperledger Fabric Assignment (JavaScript Implementation)

This repository contains a blockchain-based asset management system for a financial institution using **Hyperledger Fabric**, implemented in **JavaScript**.

## 📦 Contents

- `fabric-samples/asset-transfer-basic/chaincode-js`: Smart contract to manage assets
- `rest-api`: RESTful API to interact with the blockchain network
- `Dockerfile`: Containerization setup for the REST API

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v14+)
- Docker & Docker Compose
- Fabric binaries and samples (`fabric-samples`)

### 2. Setup Fabric Test Network

```bash
cd fabric-samples/test-network
./network.sh up createChannel -c mychannel -ca
```

### 3. Deploy JavaScript Chaincode

```bash
./network.sh deployCC -ccn assetcontract -ccp ../asset-transfer-basic/chaincode-js -ccl javascript
```

---

## 🧠 Smart Contract Functions

- `initLedger()`
- `createAsset(dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks)`
- `readAsset(msisdn)`
- `updateBalance(msisdn, newBalance)`
- `getAllAssets()`

---

## 🌐 REST API Setup

```bash
cd rest-api
npm install
node index.js
```

### Sample Requests

- **Create Asset**

```bash
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{
  "dealerId": "D123",
  "msisdn": "9000000000",
  "mpin": "4321",
  "balance": "10000",
  "status": "ACTIVE",
  "transAmount": "0",
  "transType": "",
  "remarks": "new asset"
}'
```

- **Read Asset**

```bash
curl http://localhost:3000/read/9000000000
```

---

## 🐳 Docker Support

Build and run REST API in Docker:

```bash
docker build -t asset-rest-api .
docker run -p 3000:3000 asset-rest-api
```

---

## 📄 License

MIT License

---

## ✍️ Author

Arepalli Siddharth G
