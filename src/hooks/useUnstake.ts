import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, smartShrimpUnstake } from 'utils/callHelpers'
import { useMasterShrimp, useSmartChef } from './useContract'

const useUnstake = (pid: number, masterChef) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  // const masterShrimpContract = useMasterShrimp()

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      const txHash = await unstake(masterChef, pid, amount, account, decimals)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChef, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useSmartUnstake = (sousId: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const smartChefContract = useSmartChef(sousId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      await smartShrimpUnstake(smartChefContract, amount, account)
      dispatch(updateUserStakedBalance(String(sousId), account))
      dispatch(updateUserBalance(String(sousId), account))
      dispatch(updateUserPendingReward(String(sousId), account))
    },
    [account, dispatch, smartChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
