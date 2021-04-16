import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const farms: FarmConfig[] = [
  {
    pid: 0,
    isTokenOnly: true,
    lpSymbol: 'SHRIMP',
    lpAddresses: {
      97: '', // FIXME: SHRIMP-BUSD
      56: '', // FIXME: SHRIMP-BUSD
    },
    tokenSymbol: 'SHRIMP',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 1,
    lpSymbol: 'SHRIMP-BUSD',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'SHRIMP',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 2,
    lpSymbol: 'SHRIMP-BNB',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'SHRIMP',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    isMasterShrimp: true,
  },
  {
    pid: 3,
    lpSymbol: 'BNB-BUSD',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 4,
    lpSymbol: 'USDT-USDC',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 5,
    lpSymbol: 'ETH-BETH',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'BETH',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
    isMasterShrimp: true,
  },
  {
    pid: 6,
    lpSymbol: 'CAKE-BUSD',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 7,
    lpSymbol: 'CAKE-BNB',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    isMasterShrimp: true,
  },
  {
    pid: 8,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 9,
    isTokenOnly: true,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 10,
    isTokenOnly: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 11,
    isTokenOnly: true,
    lpSymbol: 'SALT',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.SALT,
    quoteTokenAdresses: contracts.salt,
    isMasterShrimp: true,
  },
  {
    pid: 12,
    lpSymbol: 'SHRIMP-CAKE',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '', // FIXME: SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
].filter((f) => f.lpAddresses[CHAIN_ID])

export default farms
