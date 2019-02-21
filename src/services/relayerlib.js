const axios = require('axios');
const Web3 = require('web3');

class Relayerlib {
  constructor(relayerGateway, privateKey) {
    this.relayerGateway = relayerGateway;
    this.privateKey = privateKey;
    this.web3 = new Web3('http://127.0.0.1:8545');
  }

  sendMetaTx(address, contractName, methodName, ...params) {
    let nonce;
    let hash;

    return this.getNonce(address, contractName)
      .then((res) => {
        nonce = res;

        return this.getHash(address, contractName, methodName, ...params);
      })
      .then((res) => {
        hash = res;

        const {
          signature,
        } = this.web3.eth.accounts.sign(hash, this.privateKey);

        const data = {
          address,
          contractName,
          methodName,
          signature,
          hash,
          params,
        };

        data.params.push(nonce);

        return axios.post(`${this.relayerGateway}/metatx`, data);
      })
      .then(res => res.data.transactionHash)
      .catch((err) => {
        console.log(err);
      });
  }

  getNonce(address, contractName) {
    const data = {
      address,
      contractName,
    };

    return axios.post(`${this.relayerGateway}/nonce`, data)
      .then(res => res.data)
      .catch(err => err);
  }

  getHash(address, contractName, methodName, ...params) {
    const data = {
      contractName,
      methodName,
      params,
    };

    return this.getNonce(address, contractName)
      .then((nonce) => {
        data.params.push(nonce);

        return axios.post(`${this.relayerGateway}/hash`, data);
      })
      .then(res => res.data)
      .catch(err => err);
  }
}

module.exports = Relayerlib;
