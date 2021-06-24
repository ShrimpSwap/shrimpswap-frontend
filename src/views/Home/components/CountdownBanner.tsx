import React from 'react'
import moment from 'moment'
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
  font-size: 24px;
  line-height: 110%;
  white-space: nowrap;
  color: white;
`

const CountdownBanner = () => (
  <StyledCountdownBanner>
    <Container>
      <Countdown>
        Farming opens on block{' '}
        <a href="https://bscscan.com/block/countdown/8774580" style={{ color: '#88bbdb' }}>
          8774580
        </a>
        {` (${moment.utc('01 07 2021 12:45:00', 'DD MM YYYY hh:mm:ss').fromNow()})`}. Refer to our {` `}
        <a href="https://shrimpswap.gitbook.io/shrimpswap/v2-whale/migration" style={{ color: '#88bbdb' }}>
          migration guide
        </a>
        .
      </Countdown>
    </Container>
  </StyledCountdownBanner>
)

export default CountdownBanner
