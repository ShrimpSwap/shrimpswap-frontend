import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@shrimpswap/uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`

const Blurb = styled(Text)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

const StyledHero = styled.div`
  padding-bottom: 24px;
  padding-top: 24px;
`
const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <Container>
        <Title>{TranslateString(500, 'IDO: Initial Dex Offering')}</Title>
        <Blurb>{TranslateString(502, 'Buy new tokens with a brand new token sale model.')}</Blurb>
        <Blurb>1% of the raised amount is used to buyback and burn SHRIMP or contribute to a new Ocean</Blurb>
      </Container>
    </StyledHero>
  )
}

export default Hero
