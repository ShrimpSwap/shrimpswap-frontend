import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Text } from '@shrimpswap/uikit'
import { usePriceShrimpBusd } from 'state/hooks'
import BigNumber from 'bignumber.js'

export interface PrizeGridProps {
  lotteryPrizeAmount?: number
  pastDraw?: boolean
  jackpotMatches?: number
  twoTicketMatches?: number
  threeTicketMatches?: number
}

const Grid = styled.div<{ pastDraw?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.pastDraw ? 4 : 3)}, 1fr);
  grid-template-rows: repeat(4, auto);
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const RightAlignedHeading = styled(Text)`
  text-align: right;
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
`

const PastDrawGridItem = styled(GridItem)`
  transform: translate(-40%, 0%);
`

const PrizeGrid: React.FC<PrizeGridProps> = ({
  lotteryPrizeAmount = 0,
  pastDraw = false,
  jackpotMatches,
  twoTicketMatches,
  threeTicketMatches,
}) => {
  const fourMatchesAmount = +((lotteryPrizeAmount / 100) * 50).toFixed(2)
  const threeMatchesAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(2)
  const twoMatchesAmount = +((lotteryPrizeAmount / 100) * 10).toFixed(2)
  const burnAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(2)
  const TranslateString = useI18n()
  const shrimpPriceUsd = usePriceShrimpBusd()

  return (
    <Grid pastDraw={pastDraw}>
      <GridItem>
        <Text fontSize="14px" color="textSubtle">
          {TranslateString(999, 'No. Matched')}
        </Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText fontSize="14px" color="textSubtle">
            {TranslateString(999, 'Winners')}
          </RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="14px" color="textSubtle">
          {TranslateString(999, 'Prize Pot')}
        </RightAlignedText>
      </GridItem>
      <GridItem>
        <RightAlignedText fontSize="14px" color="textSubtle">
          {TranslateString(999, 'USD')}
        </RightAlignedText>
      </GridItem>
      {/* 4 matches row */}
      <GridItem>
        <Text fontSize="16px" bold>
          4 matches
        </Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading fontSize="16px" bold>
            {jackpotMatches}
          </RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading fontSize="16px" bold>
          {fourMatchesAmount.toLocaleString()} SHRIMP
        </RightAlignedHeading>
      </GridItem>
      <GridItem>
        <RightAlignedHeading fontSize="16px" bold>
          ${(+shrimpPriceUsd.times(new BigNumber(fourMatchesAmount)).toFixed(0)).toLocaleString()}
        </RightAlignedHeading>
      </GridItem>
      {/* 3 matches row */}
      <GridItem>
        <Text fontSize="15px">3 matches</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText fontSize="15px" bold>
            {threeTicketMatches}
          </RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="15px" bold>
          {threeMatchesAmount.toLocaleString()} SHRIMP
        </RightAlignedText>
      </GridItem>
      <GridItem>
        <RightAlignedText fontSize="15px" bold>
          ${(+shrimpPriceUsd.times(new BigNumber(threeMatchesAmount)).toFixed(0)).toLocaleString()}
        </RightAlignedText>
      </GridItem>
      {/* 2 matches row */}
      <GridItem marginBottom="20px">
        <Text fontSize="14px">2 matches</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem marginBottom="20px">
          <RightAlignedText fontSize="14px">{twoTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem marginBottom="20px">
        <RightAlignedText fontSize="14px">{twoMatchesAmount.toLocaleString()} SHRIMP</RightAlignedText>
      </GridItem>
      <GridItem>
        <RightAlignedText fontSize="14px">
          ${(+shrimpPriceUsd.times(new BigNumber(twoMatchesAmount)).toFixed(0)).toLocaleString()}
        </RightAlignedText>
      </GridItem>
      {/* Burn row */}
      <GridItem marginBottom="0">
        <Text fontSize="15px">🔥{TranslateString(999, `${pastDraw ? 'Burned' : 'To burn'}`)}:</Text>
      </GridItem>
      {pastDraw ? (
        <>
          <GridItem marginBottom="0" />
          <GridItem marginBottom="0">
            <RightAlignedText fontSize="15px">{burnAmount.toLocaleString()} SHRIMP</RightAlignedText>
          </GridItem>
        </>
      ) : (
        <GridItem marginBottom="0">
          <RightAlignedText fontSize="15px">{burnAmount.toLocaleString()} SHRIMP</RightAlignedText>
        </GridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="15px">
          ${(+shrimpPriceUsd.times(new BigNumber(burnAmount)).toFixed(0)).toLocaleString()}
        </RightAlignedText>
      </GridItem>
    </Grid>
  )
}

export default PrizeGrid
