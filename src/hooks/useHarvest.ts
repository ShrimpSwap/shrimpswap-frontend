import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { smartHarvest, smartHarvestBnb, harvest } from 'utils/callHelpers'
import { useMasterShrimp, useMasterWhale, useSmartChef } from './useContract'

export const useHarvest = (farmPid: number, whale: boolean) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterShrimpContract = useMasterShrimp()
  const masterWhaleContract = useMasterWhale()
  const masterChef = whale ? masterWhaleContract : masterShrimpContract

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChef, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChef])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[], whale: boolean) => {
  const { account } = useWallet()
  const masterShrimpContract = useMasterShrimp()
  const masterWhaleContract = useMasterWhale()
  const masterChef = whale ? masterWhaleContract : masterShrimpContract

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => [...accum, harvest(masterChef, pid, account)], [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChef])

  return { onReward: handleHarvest }
}

export const useSmartChefHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const smartChefContract = useSmartChef(sousId)

  const handleHarvest = useCallback(async () => {
    const harvestFn = isUsingBnb ? smartHarvestBnb : smartHarvest
    await harvestFn(smartChefContract, account)
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, smartChefContract, sousId])

  return { onReward: handleHarvest }
}
