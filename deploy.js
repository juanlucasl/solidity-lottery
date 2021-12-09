const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface: abi, bytecode: evm } = require('./compile');
const keys = require('./config/keys');

const provider = new HDWalletProvider(
    keys.DEPLOYER_KEY,
    keys.INFURA_API
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data: evm })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract interface', abi);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();