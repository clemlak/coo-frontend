import Web3 from 'web3';
import Build from './MetaCOO.json';

const web3 = new Web3(window.web3);

const networkId = 3;
const { abi } = Build;
const { address } = Build.networks[networkId];

const cooContract = new web3.eth.Contract(abi, address);

export default cooContract;
