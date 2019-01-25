import Web3 from 'web3';
import Build from './DummyToken.json';

const web3 = new Web3(window.web3);

const networkId = 3;
const { abi } = Build;
const { address } = Build.networks[networkId];

const tokenContract = new web3.eth.Contract(abi, address);

export default tokenContract;
