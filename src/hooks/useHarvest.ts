import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { smartHarvest, smartHarvestBnb, harvest } from 'utils/callHelpers'
import { useMasterShrimp, useSmartChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterShrimpContract = useMasterShrimp()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterShrimpContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterShrimpContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const masterShrimpContract = useMasterShrimp()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => [...accum, harvest(masterShrimpContract, pid, account)], [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterShrimpContract])

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
