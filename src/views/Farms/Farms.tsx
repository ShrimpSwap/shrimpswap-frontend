import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Heading } from '@shrimpswap/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceShrimpBusd, usePriceWhaleBusd, usePriceEthBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import styled from 'styled-components'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps {
  tokenMode?: boolean
  shrimp?: boolean
}

const Hero = styled.div<{ whaleMode: boolean }>`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: ${({ whaleMode }) =>
      whaleMode
        ? "url('/images/whales-bg-2.svg'), url('/images/whales-bg.svg')"
        : "url('/images/shrimps-bg-2.svg'), url('/images/shrimps-bg.svg')"};
    background-position: left center, right center;
    height: 110px;
    padding-top: 0;
  }
`

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const farmsLP = useFarms()
  const shrimpPrice = usePriceShrimpBusd()
  const whalePrice = usePriceWhaleBusd()
  const bnbPrice = usePriceBnbBusd()

  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const whaleMode = !farmsProps.shrimp
  const ethPriceUsd = usePriceEthBusd()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X' && farm.whale !== farmsProps.shrimp)
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')
  const stackedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  // console.log("farm",activeFarms)
  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const shrimpRewardPerBlock = new BigNumber(farm.shrimpPerBlock || 1)
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18))
        const shrimpRewardPerYear = shrimpRewardPerBlock.times(BLOCKS_PER_YEAR)
        const farmedTokenPrice = farm.whale ? whalePrice : shrimpPrice
        let apy = farmedTokenPrice.times(shrimpRewardPerYear)

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          totalValue = totalValue.times(ethPriceUsd)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.key}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={farm.whale ? whalePrice : shrimpPrice}
          ethPrice={ethPriceUsd}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, shrimpPrice, whalePrice, ethPriceUsd, ethereum],
  )

  return (
    <Page>
      <Hero whaleMode={whaleMode}>
        <Heading as="h1" size="lg" color="primary" mb="10px" style={{ textAlign: 'center' }}>
          {`Stake tokens or PCS LP ${whaleMode ? 'V2' : ''} tokens to earn ${whaleMode ? '🐳 WHALE' : '🦐 SHRIMP'}`}
        </Heading>
        <Heading as="h2" color="secondary" mb="20px" style={{ textAlign: 'center' }}>
          The Deposit Fee will be used to create Oceans
        </Heading>
      </Hero>
      <FarmTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />
      <div>
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stackedOnly ? farmsList(stackedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
      </div>
    </Page>
  )
}

export default Farms
