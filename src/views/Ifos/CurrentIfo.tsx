import React from 'react'
import { ifosConfig } from 'config/constants'
import IfoCard from './components/IfoCard'
import IfoCards from './components/IfoCards'

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => (
  <IfoCards isSingle>
    <IfoCard ifo={activeIfo} />
  </IfoCards>
)

export default Ifo
