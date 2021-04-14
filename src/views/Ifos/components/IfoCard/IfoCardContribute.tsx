import React, { useState, useEffect } from 'react'
import { useModal, Text } from '@shrimpswap/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status: IfoStatus
  raisingAmount: BigNumber
  softCapReached: boolean
  finalized: boolean
}

const IfoCardContribute: React.FC<Props> = ({
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  softCapReached,
  finalized,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [contributions, setContributions] = useState(new BigNumber(0))
  const [claimedTokens, setClaimedTokens] = useState(new BigNumber(0))
  const [refundedTokens, setRefundedTokens] = useState(new BigNumber(0))
  const [tokensPerBnb, setTokensPerBnb] = useState(new BigNumber(0))

  const { account } = useWallet()
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  useEffect(() => {
    const fetch = async () => {
      setContributions(new BigNumber(await contract.methods.contributions(account).call()))
      setClaimedTokens(new BigNumber(await contract.methods.claimedTokens(account).call()))
      setRefundedTokens(new BigNumber(await contract.methods.refunds(account).call()))
      setTokensPerBnb(new BigNumber(await contract.methods.tokensPerBnb().call()))
    }

    if (account) {
      fetch()
    }
  }, [account, contract.methods, pendingTx])

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.claimTokens().send({ from: account })
    setPendingTx(false)
  }

  const refund = async () => {
    setPendingTx(true)
    await contract.methods.claimRefund().send({ from: account })
    setPendingTx(false)
  }

  const isFinished = status === 'finished' || finalized
  const percentOfUserContribution = new BigNumber(contributions).div(raisingAmount).times(100)

  const userClaimed = isFinished && claimedTokens.isGreaterThan(new BigNumber(0))
  const userRefunded = isFinished && refundedTokens.isGreaterThan(new BigNumber(0))

  const claimableTokens = getBalanceNumber(contributions) * getBalanceNumber(tokensPerBnb)

  const getButtonLabel = () => {
    if (!isFinished) return 'Contribute'

    if (softCapReached) return 'Claim'

    return 'Refund'
  }

  const getLabel = () => {
    if (!isFinished) return `Your contribution (${currency})`

    if (softCapReached) return 'Your tokens to claim'

    return 'Your tokens to refund'
  }

  const getButtonValue = () => {
    if (!isFinished) {
      return getBalanceNumber(contributions, 18).toFixed(4)
    }

    if (softCapReached) {
      return userClaimed ? 'Claimed' : claimableTokens.toFixed(4)
    }

    return userRefunded ? 'Refunded' : claimableTokens.toFixed(4)
  }

  const getButtonHint = () => {
    if (!isFinished) return `${percentOfUserContribution.toFixed(5)}% of total`

    if (softCapReached) return `You'll be refunded any excess tokens when you claim`

    return `You'll be refunded all your contributions`
  }

  const handleOnClick = () => {
    if (!isFinished) return onPresentContributeModal

    if (softCapReached) return claim

    return refund
  }

  return (
    <>
      <LabelButton
        disabled={pendingTx || userClaimed || userRefunded}
        buttonLabel={getButtonLabel()}
        label={getLabel()}
        value={getButtonValue()}
        onClick={handleOnClick()}
      />
      <Text fontSize="14px" color="textSubtle">
        {getButtonHint()}
      </Text>
    </>
  )
}

export default IfoCardContribute
