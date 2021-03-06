import React, { useEffect, useRef } from 'react'
import { Card, CardBody, Heading } from '@shrimpswap/uikit'
import styled from 'styled-components'
import { usePriceShrimpBusd, usePriceWhaleBusd } from 'state/hooks'
import { useBurnedBalance, useTotalSupply, useTotalSupplyWhale } from 'hooks/useTokenBalance'
import { getShrimpAddress, getWhaleAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { useCountUp } from 'react-countup'
import { getBalanceNumber } from 'utils/formatBalance'

const StyledTotalMarketCapCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const TotalMarketCapCard = () => {
  const burnedBalance = useBurnedBalance(getShrimpAddress())
  const totalSupply = useTotalSupply()
  const shrimpPrice = usePriceShrimpBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const marketCap = shrimpPrice.times(circSupply)

  const burnedBalanceWhale = useBurnedBalance(getWhaleAddress())
  const totalSupplyWhale = useTotalSupplyWhale()
  const whalePrice = usePriceWhaleBusd()
  const circSupplyWhale = totalSupplyWhale ? totalSupplyWhale.minus(burnedBalanceWhale) : new BigNumber(0)
  const marketCapWhale = whalePrice.times(circSupplyWhale)

  const value = getBalanceNumber(marketCap)
  const valueWhale = getBalanceNumber(marketCapWhale)

  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 2,
    separator: ',',
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <StyledTotalMarketCapCard>
      <CardBody>
        <Heading>
          Shrimp Total Market Cap{' '}
          <a href="https://shrimpswap.finance/graph" style={{ color: '#bd1220' }}>
            ${countUp}
          </a>
        </Heading>
      </CardBody>
      <CardBody>
        <Heading>
          Whale Total Market Cap{' '}
          <a href="https://shrimpswap.finance/graph" style={{ color: '#bd1220' }}>
            ${valueWhale}
          </a>
        </Heading>
      </CardBody>
    </StyledTotalMarketCapCard>
  )
}

export default TotalMarketCapCard
