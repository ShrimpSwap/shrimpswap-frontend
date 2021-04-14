import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link } from '@shrimpswap/uikit'
import useI18n from 'hooks/useI18n'

const LayoutWrapper = styled.div`
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 16px;
`

const HowItWorks = () => {
  const TranslateString = useI18n()

  return (
    <LayoutWrapper>
      <StyledHeading size="lg" as="h3" color="secondary">
        {TranslateString(999, 'How does it work?')}
      </StyledHeading>
      <Text fontSize="16px" style={{ display: 'flex', justifyContent: 'center' }}>
        Spend SHRIMP to buy tickets, contributing to the lottery pot.
      </Text>
      <Text fontSize="16px" style={{ display: 'flex', justifyContent: 'center' }}>
        Win prizes if 2, 3, or 4 of your ticket numbers match the winning numbers and their exact order!
      </Text>
      <StyledLink href="https://shrimpswap.gitbook.io/shrimp/core-products/lottery">Read more</StyledLink>
    </LayoutWrapper>
  )
}

export default HowItWorks
