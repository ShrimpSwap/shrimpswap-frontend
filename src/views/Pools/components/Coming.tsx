import React from 'react'
import styled from 'styled-components'
import { Image, Button } from '@shrimpswap/uikit'
import { CommunityTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'
import Card from './Card'
import CardTitle from './CardTitle'

const Balance = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 40px;
  font-weight: 600;
  padding: 10px 0;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 16px;
`

const DetailPlaceholder = styled.div`
  display: flex;
  font-size: 14px;
  padding: 4px 0;
`
const Value = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  padding: 24px;
`
const Coming: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <CardTitle>{TranslateString(414, 'Your Shrimpy Project')}</CardTitle>
        <Image src="/images/shrimpy-bw.png" width={64} height={64} alt="Your shrimpy project" />
        <Balance>0.0</Balance>
        <Label>{TranslateString(416, 'Create a pool for your token')}</Label>
        <Button
          variant="secondary"
          as="button"
          fullWidth
          mb="16px"
          // eslint-disable-next-line no-alert
          onClick={() => alert(`We'll announce soon on Telegram how to apply, stay tunned!`)}
        >
          {TranslateString(418, 'Apply Now')}
        </Button>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APR')}:</div>
          <Value>0.0</Value>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>
            <span role="img" aria-label="shrimp">
              🦐{' '}
            </span>
            {TranslateString(384, 'Your Stake')}:
          </div>
          <Value>0 SHRIMP</Value>
        </DetailPlaceholder>
      </div>
      <Footer>
        <CommunityTag />
      </Footer>
    </Card>
  )
}

export default Coming
