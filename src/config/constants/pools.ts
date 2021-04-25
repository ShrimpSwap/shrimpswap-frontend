import { PoolCategory, PoolConfig, QuoteToken } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'SALT',
    stakingTokenName: QuoteToken.SHRIMP,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
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
    projectLink: 'https://https://www.saltswap.finance/',
    harvest: true,
    tokenPerBlock: '0.005787037037037037',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    burnFee: 10,
  },
]

export default pools
