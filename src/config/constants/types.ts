export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: Address
  name: string
  token: string
  maxContribution: string
  minContribution: string
  subTitle?: string
  description?: string
  saleAmount: string
  raiseAmount: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
}

export enum QuoteToken {
  'BNB' = 'BNB',
  'WBNB' = 'WBNB',
  'SHRIMP' = 'SHRIMP',
  'CAKE' = 'CAKE',
  'BUSD' = 'BUSD',
  'USDC' = 'USDC',
  'ETH' = 'ETH',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'SALT' = 'SALT',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string
  56: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  rewardTokenAddresses?: Address
  isMasterShrimp: boolean
  multiplier?: string
  isTokenOnly?: boolean
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: Address
  contractAddress: Address
  rewardTokenAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
  burnFee: number
}

export type Nft = {
  name: string
  description: string
  originalImage: string
  previewImage: string
  blurImage: string
  sortOrder: number
  bunnyId: number
}
