import React from 'react'
import IFrame from 'views/Trade'
import FullPage from './components/FullPage'

const Graph: React.FC = () => (
  <FullPage>
    <IFrame
      title="graph"
      url="https://goswappcharts.web.app/?isbsc=true&tokenId=0x2849b1ae7e04a3d9bc288673a92477cf63f28af4"
    />
  </FullPage>
)

export default Graph
