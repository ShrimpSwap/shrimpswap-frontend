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
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e',
    },
    tokenSymbol: 'SHRIMP',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
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
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
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
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
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
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
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
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
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
      56: '0x99d865Ed50D2C32c1493896810FA386c1Ce81D91',
    },
    tokenSymbol: 'BETH',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
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
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 7,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '', // FIXME
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 8,
    isTokenOnly: true,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '', // FIXME
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 9,
    isTokenOnly: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '', // FIXME
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 10,
    isTokenOnly: true,
    lpSymbol: 'SALT',
    lpAddresses: {
      97: '', // FIXME
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4',
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    quoteTokenSymbol: QuoteToken.SALT,
    quoteTokenAdresses: contracts.salt,
    isMasterShrimp: true,
  },
  {
    pid: 11,
    lpSymbol: 'SHRIMP-CAKE',
    lpAddresses: {
      97: '', // FIXME
      56: '', // FIXME
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
].filter((f) => f.lpAddresses[CHAIN_ID])

export default farms
