import React from 'react'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, useModal } from '@shrimpswap/uikit'
import { Address } from 'config/constants/types'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  apy?: BigNumber
  shrimpPrice?: BigNumber
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  stakedBalanceInUSD?: BigNumber
  tokenAddresses: Address
}

const ApyButton: React.FC<ApyButtonProps> = ({
  apy,
  shrimpPrice,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  stakedBalanceInUSD,
  tokenAddresses,
}) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      lpLabel={lpLabel}
      quoteTokenAdresses={quoteTokenAdresses}
      quoteTokenSymbol={quoteTokenSymbol}
      tokenAddresses={tokenAddresses}
      shrimpPrice={shrimpPrice}
      stakedBalanceInUSD={stakedBalanceInUSD}
      apy={apy}
    />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px">
      <CalculateIcon />
    </IconButton>
  )
}

export default ApyButton
