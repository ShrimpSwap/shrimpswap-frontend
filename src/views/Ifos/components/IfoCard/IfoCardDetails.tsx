import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal } from '@shrimpswap/uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDetailsProps {
  saleAmount: string
  raiseAmount: string
  projectSiteUrl: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
  token: string
  currency: string
  maxContribution: string
  minContribution: string
}

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  saleAmount,
  token,
  currency,
  projectSiteUrl,
  maxContribution,
  minContribution,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>{TranslateString(584, 'For Sale')}</Display>
          <Text>
            {saleAmount} {token}
          </Text>
        </Item>
        <Item>
          <Display>Max contribution</Display>
          <Text>
            {maxContribution} {currency}
          </Text>
        </Item>
        <Item>
          <Display>Min contribution</Display>
          <Text>
            {minContribution} {currency}
          </Text>
        </Item>
      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {TranslateString(412, 'View project site')}
      </LinkExternal>
    </>
  )
}

export default IfoCardDetails
