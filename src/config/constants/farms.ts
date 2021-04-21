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
      56: '0x0984018619DcA2B783ebf5578D9E6441C0897870', // SHRIMP-BUSD
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
      56: '0x0984018619DcA2B783ebf5578D9E6441C0897870', // SHRIMP-BUSD
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
      56: '0x4Ace7a7BB1fCD7b6e7Fd707ebdE3Ffea3F21524A', // SHRIMP-BNB
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
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // BNB
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 4,
    lpSymbol: 'ETH-BETH',
    lpAddresses: {
      97: '', // FIXME
      56: '0x99d865Ed50D2C32c1493896810FA386c1Ce81D91', // ETH-BETH
    },
    tokenSymbol: 'BETH',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x250632378e573c6be1ac2f97fcdf00515d0aa91b', // BETH
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
    isMasterShrimp: true,
  },
  {
    pid: 5,
    lpSymbol: 'CAKE-BUSD',
    lpAddresses: {
      97: '', // FIXME
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // CAKE-BUSD
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // CAKE
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 6,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '', // FIXME
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 7,
    isTokenOnly: true,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '', // FIXME
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 8,
    isTokenOnly: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '', // FIXME
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // CAKE-BUSD
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // CAKE
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 9,
    isTokenOnly: true,
    lpSymbol: 'DOGE',
    lpAddresses: {
      97: '', // FIXME
      56: '0x1efcb446bfa553a2eb2fff99c9f76962be6ecac3', // DOGE-BUSD
    },
    tokenSymbol: 'DOGE',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0xba2ae424d960c26247dd6c32edc70b295c744c43', // DOGE
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
  {
    pid: 10,
    lpSymbol: 'USDT-USDC',
    lpAddresses: {
      97: '', // FIXME
      56: '0x85f8628bfff75d08f1aa415e5c7e85d96bfd7f57', // USDT-USDC
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x55d398326f99059ff775485246999027b3197955', // USDT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
    isMasterShrimp: true,
  },
  {
    pid: 11,
    isTokenOnly: true,
    lpSymbol: 'SALT',
    lpAddresses: {
      97: '', // FIXME
      56: '0x6596f770786915556C47E301cC8290aa14288d99', // SALT-BUSD
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x40993B0d75ed2d70d644C12E4BdeccE955E9AcfF', // SHRIMP
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
  },
].filter((f) => f.lpAddresses[CHAIN_ID])

export default farms
