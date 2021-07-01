import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterShrimpABI from 'config/abi/masterShrimp.json'
import multicall from 'utils/multicall'
import { getMasterShrimpAddress, getMasterWhaleAddress } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'
import { QuoteToken } from '../../config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchFarms = async () => {
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAdress = farmConfig.lpAddresses[CHAIN_ID]
      const calls = [
        // Balance of token in the LP contract
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of quote token on LP contract
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAdress,
          name: 'balanceOf',
          params: [farmConfig.whale ? getMasterWhaleAddress() : getMasterShrimpAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAdress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'decimals',
        },
      ]
      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
      ] = await multicall(erc20, calls)
      let tokenAmount
      let lpTotalInQuoteToken
      let tokenPriceVsQuote
      if (farmConfig.isTokenOnly) {
        tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals))
        if (farmConfig.tokenSymbol === QuoteToken.BUSD && farmConfig.quoteTokenSymbol === QuoteToken.BUSD) {
          tokenPriceVsQuote = new BigNumber(1)
        } else {
          const quoteTokenBlanceLPDecimalAdjusted = new BigNumber(quoteTokenBlanceLP).div(
            new BigNumber(10).pow(quoteTokenDecimals),
          )
          const tokenBalanceLPAdjusted = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals))
          tokenPriceVsQuote = quoteTokenBlanceLPDecimalAdjusted.div(tokenBalanceLPAdjusted)
        }
        lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote)
      } else {
        // Ratio in % a LP tokens that are in staking, vs the total number in circulation
        const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

        // Total value in staking in quote token value
        lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(18))
          .times(new BigNumber(2))
          .times(lpTokenRatio)

        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
        const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(quoteTokenDecimals))
          .times(lpTokenRatio)

        if (tokenAmount.comparedTo(0) > 0) {
          tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount)
        } else {
          tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP))
        }
      }

      let info
      let totalAllocPoint
      let poolInfo
      let adjustmentRatio
      let initialShrimpPerblock
      let allocPoint
      let poolWeight
      let initialShrimpPerBlockFromWei

      if (!farmConfig.whale) {
        [info, totalAllocPoint, poolInfo, adjustmentRatio, initialShrimpPerblock] = await multicall(masterShrimpABI, [
          {
            address: getMasterShrimpAddress(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterShrimpAddress(),
            name: 'totalAllocPoint',
          },
          {
            address: getMasterShrimpAddress(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterShrimpAddress(),
            name: 'getCurrentAdjustmentRatio',
          },
          {
            address: getMasterShrimpAddress(),
            name: 'initialShrimpPerBlock',
          },
        ])

        allocPoint = new BigNumber(info.allocPoint._hex)
        poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
        initialShrimpPerBlockFromWei = new BigNumber(initialShrimpPerblock).div(new BigNumber(10).pow(18))
      } else {
        [info, totalAllocPoint, poolInfo, initialShrimpPerblock] = await multicall(masterShrimpABI, [
          {
            address: getMasterWhaleAddress(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterWhaleAddress(),
            name: 'totalAllocPoint',
          },
          {
            address: getMasterWhaleAddress(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterWhaleAddress(),
            name: 'rewardPerBlock',
          },
        ])

        allocPoint = new BigNumber(info.allocPoint._hex)
        poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
        initialShrimpPerBlockFromWei = new BigNumber(initialShrimpPerblock).div(new BigNumber(10).pow(18))
        adjustmentRatio = new BigNumber(10).pow(18)
      }

      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        tokenAmountRaw: new BigNumber(lpTokenBalanceMC).toJSON(),
        tokenDecimals: new BigNumber(tokenDecimals).toNumber(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        poolWeight: poolWeight.toNumber(),
        multiplier: `${allocPoint.div(100).toString()}X`,
        depositFeeBP: new BigNumber(poolInfo.depositFeeBP).times(adjustmentRatio).toNumber(),
        shrimpPerBlock: new BigNumber(adjustmentRatio).times(initialShrimpPerBlockFromWei).toNumber(),
      }
    }),
  )
  return data
}

export default fetchFarms
