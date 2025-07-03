'use strict';

const { Contract } = require('fabric-contract-api');

class AssetContract extends Contract {
  async initLedger(ctx) {
    const assets = [
      {
        DEALERID: 'D001',
        MSISDN: '9876543210',
        MPIN: '1234',
        BALANCE: 5000,
        STATUS: 'ACTIVE',
        TRANSAMOUNT: 0,
        TRANSTYPE: '',
        REMARKS: 'Initial record',
      },
    ];

    for (const asset of assets) {
      await ctx.stub.putState(asset.MSISDN, Buffer.from(JSON.stringify(asset)));
    }
  }

  async createAsset(ctx, dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks) {
    const asset = {
      DEALERID: dealerId,
      MSISDN: msisdn,
      MPIN: mpin,
      BALANCE: parseFloat(balance),
      STATUS: status,
      TRANSAMOUNT: parseFloat(transAmount),
      TRANSTYPE: transType,
      REMARKS: remarks,
    };
    await ctx.stub.putState(msisdn, Buffer.from(JSON.stringify(asset)));
    return JSON.stringify(asset);
  }

  async readAsset(ctx, msisdn) {
    const assetJSON = await ctx.stub.getState(msisdn);
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`Asset with MSISDN ${msisdn} does not exist`);
    }
    return assetJSON.toString();
  }

  async updateBalance(ctx, msisdn, newBalance) {
    const assetString = await this.readAsset(ctx, msisdn);
    const asset = JSON.parse(assetString);
    asset.BALANCE = parseFloat(newBalance);
    await ctx.stub.putState(msisdn, Buffer.from(JSON.stringify(asset)));
    return JSON.stringify(asset);
  }

  async getAllAssets(ctx) {
    const allResults = [];
    const iterator = await ctx.stub.getStateByRange('', '');
    for await (const res of iterator) {
      allResults.push(JSON.parse(res.value.toString()));
    }
    return JSON.stringify(allResults);
  }
}

module.exports = AssetContract;
