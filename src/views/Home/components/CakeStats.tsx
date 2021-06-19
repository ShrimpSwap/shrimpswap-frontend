import React from 'react'
import { Card, CardBody, Heading, Text } from '@shrimpswap/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useTotalWhaleSupply, useBurnedBalance, useMaxSupply } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getShrimpAddress, getWhaleAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms } from '../../../state/hooks'

export interface CakeStatsProps {
  shrimp?: boolean
}

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
const CakeStats: React.FC<CakeStatsProps> = (cakeStatsProps) => {
  const TranslateString = useI18n()
  const whaleMode = !cakeStatsProps.shrimp
  const totalSupplyShrimp = useTotalSupply()
  const totalSupplyWhale = useTotalWhaleSupply()
  const totalSupply = whaleMode ? totalSupplyWhale : totalSupplyShrimp
  const burnedBalanceShrimp = useBurnedBalance(getShrimpAddress())
  const burnedBalanceWhale = useBurnedBalance(getWhaleAddress())
  const burnedBalance = whaleMode ? burnedBalanceWhale : burnedBalanceShrimp
  const farms = useFarms()
  const maxSupply = useMaxSupply()

  const shrimpSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  let shrimpPerBlock = 0
  if (farms && farms[0] && farms[0].shrimpPerBlock) {
    const shrimpPerBlockFarm = whaleMode ? farms[20].shrimpPerBlock : farms[0].shrimpPerBlock
    shrimpPerBlock = new BigNumber(shrimpPerBlockFarm).div(new BigNumber(10).pow(18)).toNumber()
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
        {whaleMode ? '🐳' : '🦐'} {TranslateString(534, 'Statistics')}
        </Heading>
        <Row>
          <Text fontSize="14px">Total {whaleMode ? 'WHALE' : 'SHRIMP'} Supply</Text>
          {shrimpSupply && <CardValue fontSize="14px" value={shrimpSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">Total {whaleMode ? 'WHALE' : 'SHRIMP'} Burned</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">New {whaleMode ? 'WHALE' : 'SHRIMP'}</Text>
          <Text bold fontSize="14px">
            {shrimpPerBlock}
          </Text>
        </Row>
        {whaleMode ? (
          <Row />
        ) : (
          <Row>
            <Text fontSize="14px">Max SHRIMP supply</Text>
            <Text bold fontSize="14px">
              {maxSupply}
            </Text>
          </Row>
        )}
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
