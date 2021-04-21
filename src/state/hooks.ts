import BigNumber from 'bignumber.js'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import CoinGecko from 'coingecko-api'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync } from './actions'
import { State, Farm, Pool } from './types'
import { QuoteToken } from '../config/constants/types'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => useSelector((state: State) => state.farms.data)

export const useFarmFromPid = (pid: number): Farm =>
  useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))

export const useFarmFromSymbol = (lpSymbol: string): Farm =>
  useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))

export const useFarmUser = (pid: number) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : ZERO,
  }
}

// Pools

export const usePools = (account: string): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  return useSelector((state: State) => state.pools.data)
}

export const usePoolFromPid = (sousId: number): Pool =>
  useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))

// Prices

export const usePriceShrimpBusd = (): BigNumber => {
  const pid = 0 // SHRIMP-BUSD LP
  const farm = useFarmFromPid(pid)

  if (!farm) return ZERO

  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceShrimpBnb = (): BigNumber => {
  const pid = 2 // SHRIMP-BNB LP
  const farm = useFarmFromPid(pid)

  if (!farm) return ZERO

  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 3 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)

  if (!farm) return ZERO

  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceEthBusd = (): BigNumber => {
  const [ethPrice, setEthPrice] = useState(new BigNumber(2200))

  useEffect(() => {
    const fetchPrice = async () => {
      const CoinGeckoClient = new CoinGecko()
      const result = await CoinGeckoClient.coins.fetch('ethereum', {})
      setEthPrice(new BigNumber(result.data?.market_data?.current_price?.usd))
    }

    fetchPrice()
  }, [])

  return ethPrice
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  const { account } = useWallet()
  const pools = usePools(account)
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBusd()
  const shrimpPrice = usePriceShrimpBusd()
  const totalValue = useRef(new BigNumber(0))

  useEffect(() => {
    let farmsTotalValue = new BigNumber(0)
    for (let i = 0; i < farms.length; i++) {
      const farm = farms[i]
      if (farm.lpTotalInQuoteToken) {
        let val: BigNumber
        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          val = bnbPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          val = shrimpPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          val = ethPrice.times(farm.lpTotalInQuoteToken)
        } else {
          val = farm.lpTotalInQuoteToken
        }
        farmsTotalValue = farmsTotalValue.plus(val)
      }
    }

    let poolsTotalValue = new BigNumber(0)
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      let poolValue: BigNumber
      if (pool.stakingTokenName === QuoteToken.SHRIMP) {
        const totalShrimpStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = shrimpPrice.times(totalShrimpStaked)
      }

      poolsTotalValue = poolsTotalValue.plus(poolValue ?? ZERO)
    }

    totalValue.current = farmsTotalValue.plus(poolsTotalValue)
  }, [bnbPrice, ethPrice, farms, pools, shrimpPrice])

  if (!totalValue) {
    return new BigNumber(0)
  }

  return totalValue.current
}
