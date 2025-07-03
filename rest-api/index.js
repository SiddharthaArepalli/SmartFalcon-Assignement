const express = require('express');
const cors = require('cors');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const ccpPath = path.resolve(__dirname, '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function getContract() {
  const walletPath = path.join(process.cwd(), 'wallet');
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const gateway = new Gateway();
  await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('assetcontract');
  return contract;
}

app.post('/create', async (req, res) => {
  try {
    const contract = await getContract();
    const { dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks } = req.body;
    const result = await contract.submitTransaction('createAsset', dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks);
    res.send(result.toString());
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.get('/read/:msisdn', async (req, res) => {
  try {
    const contract = await getContract();
    const result = await contract.evaluateTransaction('readAsset', req.params.msisdn);
    res.send(result.toString());
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3000, () => console.log('REST API running on port 3000'));
