import React from 'react'
import { Flex } from '@shrimpswap/uikit'
import styled from 'styled-components'
import PageContainer from 'components/layout/Container'

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
          Farming opens on block <a href="https://bscscan.com/block/countdown/8774580">8774580</a> (around Thu Jul 01
          2021 12:44:20 GMT+0300){' '}
        </Countdown>
      </Flex>
      <Countdown>
        <a href="https://shrimpswap.gitbook.io/shrimpswap/v2-whale/migration">Migration guide</a>
      </Countdown>
    </Container>
  </StyledCountdownBanner>
)

export default CountdownBanner
