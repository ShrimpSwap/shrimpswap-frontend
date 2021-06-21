import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@shrimpswap/uikit'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  farmImage?: string
  tokenSymbol?: string
  whale?: boolean
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, farmImage, tokenSymbol, whale }) => (
  <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
    <Image src={`/images/farms/${whale?"whale/":""}${farmImage}.png`} alt={tokenSymbol} width={64} height={64} />
    <Flex flexDirection="column" alignItems="flex-end">
      <Heading mb="4px">{lpLabel}</Heading>
      <Flex justifyContent="center">
        {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
        <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
      </Flex>
    </Flex>
  </Wrapper>
)

export default CardHeading
