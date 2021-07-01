import React from 'react'
import styled from 'styled-components'
import { Heading, BaseLayout, Text } from '@shrimpswap/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import InfoRow from 'views/Nft/components/InfoRow'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import EarnCard from './components/EarnCard'
import TotalMarketCapCard from './components/TotalMarketCapCard'
// import CountdownBanner from './components/CountdownBanner'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 12px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/shrimps-bg-2.svg'), url('/images/shrimps-bg.svg');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 12px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 12px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <>
      {/* <CountdownBanner /> */}
      <Page>
        <Hero>
          <Heading as="h1" size="xxl" color="#21223C">
            {TranslateString(10004, 'ShrimpSwap Finance')}
          </Heading>
          <InfoRow>
            <Text>The deflationary yield farm on Binance Smart Chain</Text>
            <Text style={{ color: '#1b95e0', marginLeft: '5px' }}>#BSC</Text>
            <img src="/images/Binance_Q2_Coin_2021.png" alt="ticket" style={{ height: '16px', marginLeft: '2px' }} />
          </InfoRow>
        </Hero>
        <Cards>
          <FarmStakingCard />
          <TwitterCard />
        </Cards>
        <CTACards>
          <EarnCard />
          <TotalMarketCapCard />
        </CTACards>
        <Cards>
          <CakeStats shrimp />
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </Page>
    </>
  )
}

export default Home
