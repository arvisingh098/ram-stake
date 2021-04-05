import Web3 from 'web3';

const ramAbi = require('../constants/abi/RamToken.json');
const geyserAbi = require('../constants/abi/TokenGeyser.json');

let web3;
// eslint-disable-next-line no-undef
if (window.ethereum !== undefined) {
  // eslint-disable-next-line no-undef
  web3 = new Web3(ethereum);
}

/**
 *
 * @param {string} token address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getTokenBalance = async (token, account) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(ramAbi, token);
  return tokenContract.methods.balanceOf(account).call();
};

/**
 *
 * @param {string} token address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getBalance = async (token, account) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(ramAbi, token);
  return tokenContract.methods.balanceOf(account).call();
};

export const totalStakedFor = async (token, account) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(geyserAbi, token);
  return tokenContract.methods.totalStakedFor(account).call();
};

export const unstakeQuery = async (token, account) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(geyserAbi, token);
  let stakedAmount = await totalStakedFor(token, account);
  if (stakedAmount < 1)
    return 0;
  return tokenContract.methods.unstakeQuery(stakedAmount).call({from: account});
};

export const getTokenTotalSupply = async (token) => {
  const tokenContract = new web3.eth.Contract(ramAbi, token);
  return tokenContract.methods.totalSupply().call();
};

/**
 *
 * @param {string} token
 * @param {string} account
 * @param {string} spender
 * @return {Promise<string>}
 */
export const getTokenAllowance = async (token, account, spender) => {
  const tokenContract = new web3.eth.Contract(ramAbi, token);
  return tokenContract.methods.allowance(account, spender).call();
};