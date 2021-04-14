import React from 'react'
import { Text } from '@shrimpswap/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getShrimpAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { usePriceShrimpBusd } from 'state/hooks'
import CardValue from './CardValue'
import CardBusdValue from './ShrimpBusdValue'

const CakeWalletBalance = () => {
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getShrimpAddress())
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(usePriceShrimpBusd()).toNumber()
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(cakeBalance)} fontSize="24px" />
      <CardBusdValue value={busdBalance} />
    </>
  )
}

export default CakeWalletBalance
