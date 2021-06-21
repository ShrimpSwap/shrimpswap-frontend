import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const farms: FarmConfig[] = [
  {
    key: 0,
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
    key: 10,
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
    key: 20,
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
    key: 30,
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
    key: 40,
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
    key: 50,
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
    key: 60,
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
    key: 70,
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
    key: 80,
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
    key: 90,
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
    key: 100,
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
    key: 110,
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
  {
    key: 1,
    pid: 0,
    isTokenOnly: true,
    lpSymbol: 'WHALE',
    lpAddresses: {
      97: '',
      56: '0x13f0A2cbf6d1090231F3392c4ed2DD5E37AE005F', // TODO: Add LP
    },
    tokenSymbol: 'WHALE',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0x93662179C3590D4dA42858ABE917C10542a40831', //
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
    whale: true,
  },
  {
    key: 11,
    pid: 1,
    isTokenOnly: false,
    lpSymbol: 'SHRIMP-BUSD',
    lpAddresses: {
      97: '',
      56: '0xb2eae2D811034fB1A75684A919A772e62EF459CB', // TODO: Add LP
    },
    tokenSymbol: 'SHRIMP',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', //
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
    whale: true,
  },
  {
    key: 21,
    pid: 2,
    isTokenOnly: false,
    lpSymbol: 'SHRIMP-BNB',
    lpAddresses: {
      97: '',
      56: '0x4ab549e8edbdeaaca55ad6ae35beb50c92a44d1e', // TODO: Add LP
    },
    tokenSymbol: 'SHRIMP',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', //
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    isMasterShrimp: true,
    whale: true,
  },
  {
    key: 31,
    pid: 3,
    isTokenOnly: false,
    lpSymbol: 'WHALE-BUSD',
    lpAddresses: {
      97: '',
      56: '0x13f0A2cbf6d1090231F3392c4ed2DD5E37AE005F', // TODO: Add LP
    },
    tokenSymbol: 'WHALE',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0x93662179C3590D4dA42858ABE917C10542a40831', //
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
    whale: true,
  },
  {
    key: 41,
    pid: 4,
    isTokenOnly: false,
    lpSymbol: 'WHALE-BNB',
    lpAddresses: {
      97: '',
      56: '0xa55cf050eaec79622a168a02c8f94abd4fef1087', // TODO: Add LP
    },
    tokenSymbol: 'WHALE',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0x93662179C3590D4dA42858ABE917C10542a40831', //
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    isMasterShrimp: true,
    whale: true,
  },
  {
    key: 51,
    pid: 5,
    isTokenOnly: false,
    lpSymbol: 'CAKE-BUSD',
    lpAddresses: {
      97: '',
      56: '0x804678fa97d91b974ec2af3c843270886528a9e6', // TODO: Add LP
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', //
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
    whale: true,
  },
  {
    key: 61,
    pid: 6,
    isTokenOnly: false,
    lpSymbol: 'ETH-BETH',
    lpAddresses: {
      97: '',
      56: '0x09eA4c6412943e121352a9D6bb95BF2BcC532547', // TODO: Add LP
    },
    tokenSymbol: 'BETH',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0x250632378e573c6be1ac2f97fcdf00515d0aa91b', //
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
    isMasterShrimp: true,
    whale: true,
  },
  {
    key: 71,
    pid: 7,
    isTokenOnly: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0x804678fa97d91b974ec2af3c843270886528a9e6', // TODO: Add LP
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', //
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
    whale: true,
  },
  {
    key: 81,
    pid: 8,
    isTokenOnly: false,
    lpSymbol: 'BUSD-DAI',
    lpAddresses: {
      97: '',
      56: '0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489', // TODO: Add LP
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0x1F08f83742db8f6E217660Da5C49bD83AC674da1', // FIXME:
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', //
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isMasterShrimp: true,
    whale: true,
  },
].filter((f) => f.lpAddresses[CHAIN_ID])

export default farms
