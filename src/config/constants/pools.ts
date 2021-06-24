import { PoolCategory, PoolConfig, QuoteToken } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'SALT',
    stakingTokenName: QuoteToken.SHRIMP,
    stakingTokenAddress: {
      97: '',
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    contractAddress: {
      97: '',
      56: '0xB9dEe2F23fBd664367B26dE99442F458aD3Fb121', // SmartChef
    },
    rewardTokenAddress: {
      97: '',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.saltswap.finance/',
    harvest: true,
    tokenPerBlock: '0.005787037037037037',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    burnFee: 10,
  },
  {
    sousId: 1,
    tokenName: 'CAKE',
    stakingTokenName: QuoteToken.SHRIMP,
    stakingTokenAddress: {
      97: '',
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    contractAddress: {
      97: '',
      56: '0x21816301F7E340FFa47113f05286ab460998b437', // SmartChef
    },
    rewardTokenAddress: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // CAKE
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pancakeswap.finance/',
    harvest: true,
    tokenPerBlock: '0.000133680555555555',
    sortOrder: 2,
    isFinished: false,
    tokenDecimals: 18,
    burnFee: 20,
  },
  {
    sousId: 2,
    tokenName: 'BLZ',
    stakingTokenName: QuoteToken.SHRIMP,
    stakingTokenAddress: {
      97: '',
      56: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
    },
    contractAddress: {
      97: '',
      56: '0x0f8C6678b927761fba680b61b8922cc0efE830d1', // SmartChef
    },
    rewardTokenAddress: {
      97: '',
      56: '0x35d992a2921f18d4e363ed1a4eda6a7bf2d0a5f7', // BLAZE
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://blazefinance.xyz/',
    harvest: true,
    tokenPerBlock: '0.011574074074074074',
    sortOrder: 2,
    isFinished: false,
    tokenDecimals: 18,
    burnFee: 20,
  },
]

export default pools
