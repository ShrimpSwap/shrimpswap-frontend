import { useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import cakeABI from 'config/abi/cake.json'
import { getContract } from 'utils/web3'
import { getTokenBalance } from 'utils/erc20'
import multicall from 'utils/multicall'
import erc20 from 'config/abi/erc20.json'
import { getShrimpAddress, getWhaleAddress, getMasterShrimpAddress } from 'utils/addressHelpers'
import { useCountUp } from 'react-countup'
import useRefresh from './useRefresh'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getShrimpAddress())
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useTotalWhaleSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getWhaleAddress())
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useMaxSupply = () => {
  const value = 21000000
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 2,
    separator: ',',
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return countUp
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const burnAddress = '0x000000000000000000000000000000000000dEaD'
      const shrimpMasterChef = getMasterShrimpAddress()
      const [burnedShrimpBalance, lockedShrimp] = await multicall(erc20, [
        {
          address: tokenAddress,
          name: 'balanceOf',
          params: [burnAddress],
        },
        {
          address: tokenAddress,
          name: 'balanceOf',
          params: [shrimpMasterChef],
        },
      ])

      if (!burnedShrimpBalance) return

      setBalance(new BigNumber(burnedShrimpBalance).plus(new BigNumber(lockedShrimp)))
    }

    fetchBalance()
  }, [slowRefresh, tokenAddress])

  if (!balance) {
    return new BigNumber(0)
  }

  return balance
}

export default useTokenBalance
