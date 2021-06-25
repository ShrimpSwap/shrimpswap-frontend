import BigNumber from 'bignumber.js'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
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

export const useFarmFromKey = (key: number): Farm =>
  useSelector((state: State) => state.farms.data.find((f) => f.key === key))

export const useFarmFromSymbol = (lpSymbol: string): Farm =>
  useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))

export const useFarmUser = (key: number) => {
  const farm = useFarmFromKey(key)

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
  const key = 11 // SHRIMP-BUSD LP v2
  const farm = useFarmFromKey(key)

  if (!farm) return ZERO

  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceWhaleBusd = (): BigNumber => {
  const key = 31 // WHALE-BUSD LP
  const farm = useFarmFromKey(key)

  if (!farm) return ZERO

  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceShrimpBnb = (): BigNumber => {
  const key = 20 // SHRIMP-BNB LP
  const farm = useFarmFromKey(key)

  if (!farm) return ZERO

  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceBnbBusd = (): BigNumber => {
  const key = 30 // BUSD-BNB LP
  const farm = useFarmFromKey(key)

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

// Ocean prices

export const useOceanPriceBnb = (lpAddress: string, tokenAddress: string) => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const [wbnbTokenBalanceLP, tokenBalanceLP] = await multicall(erc20, [
        {
          address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // wbnb
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: tokenAddress,
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!tokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(tokenBalanceLP)))
    }

    fetchPrice()
  }, [lpAddress, tokenAddress])

  return price
}

// TVL
export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  const { account } = useWallet()
  const pools = usePools(account)
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBusd()
  const shrimpPrice = usePriceShrimpBusd()
  const whalePrice = usePriceWhaleBusd()
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
          if (farm.whale) {
            val = whalePrice.times(farm.lpTotalInQuoteToken)
          } else {
            val = shrimpPrice.times(farm.lpTotalInQuoteToken)
          }
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          val = ethPrice.times(farm.lpTotalInQuoteToken)
        } else {
          val = farm.lpTotalInQuoteToken
        }
        if (val.toString() !== 'NaN') {
          // Somehow .isNan() was not working
          farmsTotalValue = farmsTotalValue.plus(val)
        }
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
      if (pool.stakingTokenName === QuoteToken.WHALE) {
        const totalWhaleStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = whalePrice.times(totalWhaleStaked)
      }

      poolsTotalValue = poolsTotalValue.plus(poolValue ?? ZERO)
    }

    totalValue.current = farmsTotalValue.plus(poolsTotalValue)
  }, [bnbPrice, ethPrice, farms, pools, shrimpPrice, whalePrice])

  if (!totalValue) {
    return new BigNumber(0)
  }

  return totalValue.current
}
