import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceShrimpBusd, usePriceWhaleBusd } from 'state/hooks'
import { Menu as UikitMenu } from '@shrimpswap/uikit'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const shrimpPriceUsd = usePriceShrimpBusd()
  const whalePriceUsd = usePriceWhaleBusd()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={shrimpPriceUsd.toNumber()} 
      whalePriceUsd={whalePriceUsd.toNumber()}
      links={config}
      priceLink="#"
      whalePriceLink="#"
      {...props}
    />
  )
}

export default Menu
