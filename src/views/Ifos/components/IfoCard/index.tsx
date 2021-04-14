import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Card, CardBody, CardRibbon, Flex, Text } from '@shrimpswap/uikit'
import { Ifo, IfoStatus } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useIdoContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import useBlock from 'hooks/useBlock'
import { withStyles } from '@material-ui/core'
import IfoCardHeader from './IfoCardHeader'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardContribute from './IfoCardContribute'
import IfoCardProgress from './IfoCardProgress'
import IfoCardTime from './IfoCardTime'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
`

const StyledProgress = styled.div`
  margin-bottom: 16px;
`

const ActionWrapper = styled.div`
  margin-top: 12px;
`

const StyledLinearProgress = withStyles({
  barColorPrimary: {
    backgroundColor: '#5f696e',
  },
  bar2Buffer: {
    backgroundColor: '#b0bec5',
  },
  dashedColorPrimary: {
    backgroundImage: `radial-gradient(#b0bec5 0%, #97a4ab 16%, transparent 42%);`,
  },
  root: {
    borderRadius: 5,
    height: 14,
    padding: '0 20px',
  },
})(LinearProgress)

const getStatus = (currentTime: number, startTime: number, endTime: number): IfoStatus | null => {
  if (currentTime < startTime) {
    return 'coming_soon'
  }

  if (currentTime >= startTime && currentTime <= endTime) {
    return 'live'
  }

  if (currentTime > endTime) {
    return 'finished'
  }

  return null
}

const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString(999, 'LIVE NOW!')} />
  }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const {
    id,
    name,
    subTitle,
    description,
    saleAmount,
    raiseAmount,
    projectSiteUrl,
    currencyAddress,
    tokenDecimals,
    currency,
    maxContribution,
    minContribution,
    token,
  } = ifo

  const [state, setState] = useState({
    blocksRemaining: 0,
    endBlockNum: 0,
    hardCap: new BigNumber(0),
    hardCapProgress: 0,
    isLoading: true,
    isOpen: null,
    progress: 0,
    secondsUntilEnd: 0,
    secondsUntilStart: 0,
    softCap: new BigNumber(0),
    softCapProgress: 0,
    startBlockNum: 0,
    status: null,
    tokensPerBnb: new BigNumber(0),
    weiRaised: new BigNumber(0),
    softCapReached: false,
    finalized: false,
  })
  const { account } = useWallet()
  const presaleContract = useIdoContract(ifo.address[CHAIN_ID])

  const currentBlock = useBlock()
  const TranslateString = useI18n()

  const Ribbon = getRibbonComponent(state.status, TranslateString)

  useEffect(() => {
    const fetchProgress = async () => {
      const [
        startTime,
        endTime,
        softCap,
        hardCap,
        tokensPerBnb,
        weiRaised,
        isOpen,
        softCapReached,
        finalized,
      ] = await Promise.all([
        presaleContract.methods.startTime().call(),
        presaleContract.methods.endTime().call(),
        presaleContract.methods.softCap().call(),
        presaleContract.methods.hardCap().call(),
        presaleContract.methods.tokensPerBnb().call(),
        presaleContract.methods.weiRaised().call(),
        presaleContract.methods.isOpen().call(),
        presaleContract.methods.softCapReached().call(),
        presaleContract.methods.finalized().call(),
      ])

      const softCapProgress = (weiRaised / softCap) * 100
      const hardCapProgress = (weiRaised / hardCap) * 100

      const startBlockNum = parseInt(startTime, 10)
      const endBlockNum = parseInt(endTime, 10)
      const blocksRemaining = endBlockNum - currentBlock

      const currentTime = Math.round(Date.now() / 1000)

      // const status = getStatus(currentBlock, startBlockNum, endBlockNum)
      const status = getStatus(currentTime, startTime, endTime)

      // Calculate the total progress until finished or until start
      const progress =
        currentTime > startTime
          ? ((currentTime - startTime) / (endTime - startTime)) * 100
          : ((currentTime - endTime) / (startTime - endTime)) * 100

      setState({
        blocksRemaining,
        endBlockNum,
        hardCap,
        hardCapProgress: hardCapProgress > 100 ? 100 : hardCapProgress,
        isLoading: false,
        isOpen,
        progress,
        secondsUntilEnd: endTime - currentTime,
        secondsUntilStart: startTime - currentTime,
        softCap,
        softCapProgress: softCapProgress > 100 ? 100 : softCapProgress,
        startBlockNum,
        status,
        tokensPerBnb,
        weiRaised,
        softCapReached,
        finalized,
      })
    }

    fetchProgress()
  }, [currentBlock, presaleContract, setState])

  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished' || state.finalized

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={isActive}>
      <CardBody>
        <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} />
        <IfoCardProgress progress={state.progress} />
        <IfoCardTime
          isLoading={state.isLoading}
          status={state.status}
          secondsUntilStart={state.secondsUntilStart}
          secondsUntilEnd={state.secondsUntilEnd}
        />
        {(isActive || isFinished) && (
          <>
            <Flex justifyContent="space-between">
              <Text style={{ fontSize: '16px' }}>Price:</Text>
              <Text bold style={{ fontSize: '16px' }}>
                1 BNB = {`${new BigNumber(state.tokensPerBnb).div(10 ** tokenDecimals)}`} {ifo.token}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text style={{ fontSize: '16px' }}>BNB raised:</Text>
              <Text bold style={{ fontSize: '16px' }}>
                {getFullDisplayBalance(new BigNumber(state.weiRaised))} BNB
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text style={{ fontSize: '16px' }}>Soft Cap ({getBalanceNumber(state.softCap)} BNB):</Text>
              <Text bold style={{ fontSize: '16px' }}>
                {`${state.softCapProgress.toFixed(2)}%`}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text style={{ fontSize: '16px' }}>Hard Cap ({getBalanceNumber(state.hardCap)} BNB):</Text>
              <Text bold style={{ fontSize: '16px' }}>
                {`${state.hardCapProgress.toFixed(2)}%`}
              </Text>
            </Flex>
          </>
        )}
        <ActionWrapper>
          {(isActive || !isFinished) && (
            <StyledProgress>
              <StyledLinearProgress
                variant="buffer"
                value={state.hardCapProgress}
                valueBuffer={state.softCapProgress}
              />
            </StyledProgress>
          )}
          {!account && <UnlockButton fullWidth />}
          {(isActive || isFinished) && account && (
            <IfoCardContribute
              address={ifo.address[CHAIN_ID]}
              currency="BNB"
              currencyAddress={currencyAddress}
              contract={presaleContract}
              status={state.status}
              finalized={state.finalized}
              raisingAmount={state.hardCap}
              softCapReached={state.softCapReached}
            />
          )}
        </ActionWrapper>
        <IfoCardDescription description={description} defaultIsOpen={false} />
        <IfoCardDetails
          saleAmount={saleAmount}
          raiseAmount={raiseAmount}
          projectSiteUrl={projectSiteUrl}
          raisingAmount={state.hardCap}
          totalAmount={new BigNumber(state.weiRaised)}
          maxContribution={maxContribution}
          minContribution={minContribution}
          currency={currency}
          token={token}
        />
      </CardBody>
    </StyledIfoCard>
  )
}

export default IfoCard
