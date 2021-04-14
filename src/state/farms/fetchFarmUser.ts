import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterShrimpABI from 'config/abi/masterShrimp.json'
import multicall from 'utils/multicall'
import farmsConfig from 'config/constants/farms'
import { getMasterShrimpAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchFarmUserAllowances = async (account: string) => {
  const masterShrimpAdress = getMasterShrimpAddress()

  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return { address: lpContractAddress, name: 'allowance', params: [account, masterShrimpAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => new BigNumber(lpBalance).toJSON())
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string) => {
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => new BigNumber(tokenBalance).toJSON())
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string) => {
  const masterShrimpAdress = getMasterShrimpAddress()

  const calls = farmsConfig.map((farm) => ({
    address: masterShrimpAdress,
    name: 'userInfo',
    params: [farm.pid, account],
  }))

  const rawStakedBalances = await multicall(masterShrimpABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => new BigNumber(stakedBalance[0]._hex).toJSON())
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string) => {
  const masterShrimpAdress = getMasterShrimpAddress()

  const calls = farmsConfig.map((farm) => ({
    address: masterShrimpAdress,
    name: 'pendingShrimp',
    params: [farm.pid, account],
  }))

  const rawEarnings = await multicall(masterShrimpABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => new BigNumber(earnings).toJSON())
  return parsedEarnings
}
