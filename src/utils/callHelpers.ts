import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterShrimpContract, account) =>
  lpContract.methods.approve(masterShrimpContract.options.address, ethers.constants.MaxUint256).send({ from: account })

export const stake = async (masterShrimpContract, pid, amount, account, decimals = 18) =>
  masterShrimpContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartStake = async (smartChefContract, amount, account) =>
  smartChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartStakeBnb = async (smartChefContract, amount, account) =>
  smartChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => tx.transactionHash)

export const unstake = async (masterShrimpContract, pid, amount, account, decimals = 18) => masterShrimpContract.methods
  .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString())
  .send({ from: account })
  .on('transactionHash', (tx) => tx.transactionHash)


export const smartShrimpUnstake = async (smartShrimpContract, amount, account) => {
  smartShrimpContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)
}

export const sousUnstake = async (sousChefContract, amount, account) =>
  sousChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const sousEmegencyUnstake = async (sousChefContract, amount, account) =>
  sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const harvest = async (masterShrimpContract, pid, account) =>
  masterShrimpContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartHarvest = async (sousChefContract, account) =>
  sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartHarvestBnb = async (sousChefContract, account) =>
  sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => tx.transactionHash)
