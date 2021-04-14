import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const CAKE_PER_BLOCK = new BigNumber(1)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BSC_BLOCK_TIME = 3
export const LOTTERY_TICKET_PRICE = 1
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50

export const CAKE_POOL_PID = 1
