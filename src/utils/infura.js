import Web3 from 'web3';

import {TokenGeyser, UNI} from "../constants/tokens";
const ramAbi = require('../constants/abi/RamToken.json');
const geyserAbi = require('../constants/abi/TokenGeyser.json');
const pairAbi = require('../constants/abi/UniswapV2Pair.json');

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

export const apy = async () => {
  const wethPrice = await getWTHPrice();
  const ramPrice = await getRAMPrice();
  const poolContract = new window.web3.eth.Contract(geyserAbi, TokenGeyser.addr);
  const totalEmitted = await poolContract.methods.totalLocked().call();
  const totalStaked = await poolContract.methods.totalStaked().call();

  const uniContract = new window.web3.eth.Contract(pairAbi, UNI.addr);
  const reserve = await uniContract.methods.getReserves().call();
  const lpSupply = await uniContract.methods.totalSupply().call();

  const lpPrice = (2 * (reserve._reserve1 / Math.pow(10, 18)) * wethPrice) / (lpSupply/Math.pow(10, 18));
  const totalDeposit = totalStaked * (lpPrice / Math.pow(10, 18));

  const roi = ((totalEmitted * ramPrice) / Math.pow(10, 9)) / totalDeposit

  const apy = (Math.pow((1 + roi), 365/90) - 1) * 100;
  return apy;
};

export const getWTHPrice = async () => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD`;
  return fetch(url)
    .then((response) => response.json())
    .then(function async(data) {
      if (data) {
        return data.ethereum.usd;
      }
      return 0;
    })
    .catch((error) => {
      return 0;
    });
};

export const getRAMPrice = async () => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=ramifi&vs_currencies=USD`;
  return fetch(url)
    .then((response) => response.json())
    .then(function async(data) {
      if (data) {
        return data.ramifi.usd;
      }
      return 0;
    })
    .catch((error) => {
      return 0;
    });
};