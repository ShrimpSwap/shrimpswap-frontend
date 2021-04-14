import React from 'react'
import { Text } from '@shrimpswap/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useAllEarnings from 'hooks/useAllEarnings'
import { usePriceShrimpBusd } from 'state/hooks'
import CardValue from './CardValue'
import CardBusdValue from './ShrimpBusdValue'

const CakeHarvestBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce(
    (accum, earning) => accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber(),
    0,
  )

  const earningsBusd = new BigNumber(earningsSum).multipliedBy(usePriceShrimpBusd()).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '60px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={earningsSum} lineHeight="1.5" />
      <CardBusdValue value={earningsBusd} />
    </>
  )
}

export default CakeHarvestBalance
