import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@shrimpswap/uikit'
import useI18n from 'hooks/useI18n'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { apyModalRoi, calculateShrimpEarned, formatROI } from 'utils/compoundApyHelpers'
import { Address } from 'config/constants/types'

interface ApyCalculatorModalProps {
  apy?: BigNumber
  shrimpPrice?: BigNumber
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
  stakedBalanceInUSD?: BigNumber
  onDismiss?: () => void
}

const Grid = styled.div<{ hasStakedBalance: boolean }>`
  display: grid;
  grid-template-columns: repeat(${({ hasStakedBalance }) => (hasStakedBalance ? 4 : 3)}, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 480px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  apy,
  shrimpPrice,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  stakedBalanceInUSD,
  tokenAddresses,
  onDismiss,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const farmApy = apy.times(new BigNumber(100)).toNumber()
  const oneThousandDollarsWorthOfCake = 1000 / shrimpPrice.toNumber()

  const shrimpEarnedPerThousand1D = calculateShrimpEarned({ numberOfDays: 1, farmApy, shrimpPrice })
  const shrimpEarnedPerThousand7D = calculateShrimpEarned({ numberOfDays: 7, farmApy, shrimpPrice })
  const shrimpEarnedPerThousand30D = calculateShrimpEarned({ numberOfDays: 30, farmApy, shrimpPrice })
  const shrimpEarnedPerThousand365D = calculateShrimpEarned({ numberOfDays: 365, farmApy, shrimpPrice })

  const shrimpEarnedPerStakedAmount1D = calculateShrimpEarned({
    numberOfDays: 1,
    farmApy,
    shrimpPrice,
    principalAmount: Number(stakedBalanceInUSD),
  })
  const shrimpEarnedPerStakedAmount7D = calculateShrimpEarned({
    numberOfDays: 7,
    farmApy,
    shrimpPrice,
    principalAmount: Number(stakedBalanceInUSD),
  })
  const shrimpEarnedPerStakedAmount30D = calculateShrimpEarned({
    numberOfDays: 30,
    farmApy,
    shrimpPrice,
    principalAmount: Number(stakedBalanceInUSD),
  })
  const shrimpEarnedPerStakedAmount365D = calculateShrimpEarned({
    numberOfDays: 365,
    farmApy,
    shrimpPrice,
    principalAmount: Number(stakedBalanceInUSD),
  })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid hasStakedBalance={!stakedBalanceInUSD.isZero()}>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'SHRIMP per $1000')}
          </Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
              {`Shrimp per $${Number(stakedBalanceInUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            </Text>
          </GridItem>
        )}
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: shrimpEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{formatROI(shrimpEarnedPerThousand1D, shrimpPrice)}</Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text>{formatROI(shrimpEarnedPerStakedAmount1D, shrimpPrice)}</Text>
          </GridItem>
        )}
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: shrimpEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{formatROI(shrimpEarnedPerThousand7D, shrimpPrice)}</Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text>{formatROI(shrimpEarnedPerStakedAmount7D, shrimpPrice)}</Text>
          </GridItem>
        )}
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: shrimpEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{formatROI(shrimpEarnedPerThousand30D, shrimpPrice)}</Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text>{formatROI(shrimpEarnedPerStakedAmount30D, shrimpPrice)}</Text>
          </GridItem>
        )}
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: shrimpEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{formatROI(shrimpEarnedPerThousand365D, shrimpPrice)}</Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text>{formatROI(shrimpEarnedPerStakedAmount365D, shrimpPrice)}</Text>
          </GridItem>
        )}
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {TranslateString(
          999,
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
      <Flex justifyContent="center">
        <LinkExternal href={`https://exchange.shrimpswap.finance/#/add/${liquidityUrlPathParts}`}>
          {TranslateString(999, 'Get')} {lpLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
