import React from 'react'
import { Card } from '@shrimpswap/uikit'
import { DataResponse } from 'utils/getLotteryRoundData'
import PastRoundCardError from './PastRoundCardError'
import PastRoundCardDetails from './PastRoundCardDetails'

interface PastRoundCardProps {
  error: {
    message: string
  }
  data: DataResponse
}

const PastRoundCard: React.FC<PastRoundCardProps> = ({ error, data }) => (
  <Card>{error.message ? <PastRoundCardError error={error} /> : <PastRoundCardDetails data={data} />}</Card>
)

export default PastRoundCard
