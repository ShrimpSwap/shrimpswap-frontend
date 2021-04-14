import React from 'react'
import { Text } from '@shrimpswap/uikit'

interface PastRoundCardErrorProps {
  error: {
    message: string
  }
}

const PastRoundCardError: React.FC<PastRoundCardErrorProps> = ({ error }) => <Text p="24px">{error.message}</Text>

export default PastRoundCardError
