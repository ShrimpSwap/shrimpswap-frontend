import React from 'react'
import IFrame from 'views/Trade'
import FullPage from './components/FullPage'

const Graph: React.FC = () => (
  <FullPage>
    <IFrame title="graph" url="https://goswappcharts.web.app/?isbsc=true&tokenId=TODO" />
  </FullPage>
)

export default Graph
