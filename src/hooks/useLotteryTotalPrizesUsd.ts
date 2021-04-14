import { usePriceShrimpBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const shrimpPriceBusd = usePriceShrimpBusd()

  return totalCake * shrimpPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
