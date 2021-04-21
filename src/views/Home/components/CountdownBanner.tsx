import React from 'react'
import { Flex } from '@shrimpswap/uikit'
import styled from 'styled-components'
import PageContainer from 'components/layout/Container'
import moment from 'moment'

const StyledCountdownBanner = styled.div`
  background: #21223b;
`

const Container = styled(PageContainer)`
  padding-bottom: 24px;
  padding-top: 24px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.md} {
    text-align: left;
  }
`

const Countdown = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 110%;
  white-space: nowrap;
  color: white;
`

const CountdownBanner = () => (
  <StyledCountdownBanner>
    <Container>
      <Flex alignItems="center" justifyContent={['center', 'center', null, 'start']}>
        <Countdown>
          Farms and pools will open
          {` ${moment.utc('21 04 2021 11:00:00', 'DD MM YYYY hh:mm:ss').fromNow()}`} or when our{' '}
          <a href="https://www.saltswap.finance/ido" style={{ color: '#bd1220' }}>
            IDO
          </a>{' '}
          reaches the hardcap
        </Countdown>
      </Flex>
    </Container>
  </StyledCountdownBanner>
)

export default CountdownBanner
