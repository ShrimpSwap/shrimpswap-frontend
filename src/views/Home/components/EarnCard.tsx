import React from 'react'
import { Card, CardBody, Heading } from '@shrimpswap/uikit'
import styled from 'styled-components'

const StyledEarnCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const EarnCard = () => (
  <StyledEarnCard>
    <CardBody>
      <Heading>
        Earn 🦐 $SHRIMP in our{' '}
        <a href="https://shrimpswap.finance/farms" style={{ color: '#bd1220' }}>
          farms
        </a>{' '}
        and{' '}
        <a href="https://shrimpswap.finance/pools" style={{ color: '#bd1220' }}>
          pools
        </a>{' '}
        🤑
      </Heading>
    </CardBody>
  </StyledEarnCard>
)

export default EarnCard
