import React from 'react'
import { Heading, Card, CardBody } from '@shrimpswap/uikit'
import useI18n from 'hooks/useI18n'
import HistoryChart from './HistoryChart'

const PastDrawsHistoryCard: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Card>
      <CardBody>
        <Heading size="md">{TranslateString(999, 'Shrimpy History')}</Heading>
        <HistoryChart />
      </CardBody>
    </Card>
  )
}

export default PastDrawsHistoryCard
