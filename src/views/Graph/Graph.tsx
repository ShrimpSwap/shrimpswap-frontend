import React from 'react'
import IFrame from 'views/Trade'
import FullPage from './components/FullPage'

const Graph: React.FC = () => (
  <FullPage>
    <IFrame
      title="graph"
      url="https://goswappcharts.web.app/?isbsc=true&tokenId=0x62ee12e4fe74a815302750913c3c796bca23e40e"
    />
  </FullPage>
)

export default Graph
