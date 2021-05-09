import { MenuEntry } from '@shrimpswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.shrimpswap.finance/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.shrimpswap.finance/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Oceans',
    icon: 'WaveIcon',
    href: '/oceans',
  },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'Launchpad (IDOs)',
  //   icon: 'IdoIcon',
  //   href: '/ido',
  // },
  // {
  //   label: 'Audited By Certik',
  //   icon: 'AuditIcon',
  //   href: 'https://certik.org/projects/shrimpswap',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  {
    label: 'Listings',
    icon: 'ListingIcon',
    items: [
      // {
      //   label: 'CoinMarketCap',
      //   href: 'https://coinmarketcap.com/currencies/shrimpswap-finance',
      // },
      // {
      //   label: 'CoinGecko',
      //   href: 'https://www.coingecko.com/en/coins/shrimpswap',
      // },
      {
        label: 'DappRadar',
        href: 'https://dappradar.com/binance-smart-chain/defi/shrimpswap',
      },
    ],
  },
  {
    label: 'Price',
    icon: 'GraphIcon',
    href: '/graph',
  },
  // {
  //   label: 'More',
  //   icon: 'MoreIcon',
  //   items: [
  // {
  //   label: 'Voting',
  //   href: 'https://voting.shrimpswap.finance',
  // },
  {
    label: 'Github',
    href: 'https://github.com/shrimpswap',
    icon: 'GithubIcon',
  },
  {
    label: 'Roadmap',
    href: 'https://shrimpswap.gitbook.io/shrimpswap/roadmap',
    icon: 'RoadmapIcon',
  },
  {
    label: 'Docs',
    href: 'https://shrimpswap.gitbook.io',
    icon: 'GitbookIcon',
  },
  // {
  //   label: 'Blog',
  //   href: 'https://medium.com/@shrimpyswap',
  //   icon: 'MediumIcon',
  // },
  // ],
  // },
]

export default config
