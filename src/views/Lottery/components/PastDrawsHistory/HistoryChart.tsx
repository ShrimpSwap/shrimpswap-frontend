import React, { lazy, Suspense, useContext } from 'react'
import styled from 'styled-components'
import { Text } from '@shrimpswap/uikit'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import Loading from '../Loading'

const Line = lazy(() => import('./LineChartWrapper'))

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LegendItem = styled.div`
  display: flex;
  margin-right: 18px;
  align-items: center;
  margin: 12px 0;
`

const Circle = styled.div<{ isPoolSize?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ isPoolSize, theme }) => theme.colors[isPoolSize ? 'textSubtle' : 'primary']};
  margin-right: 6px;
`

const HistoryChart: React.FC = () => {
  const { historyData, historyError } = useContext(PastLotteryDataContext)
  const getDataArray = (kind) => historyData.map((dataPoint) => dataPoint[kind]).reverse()

  const lineStyles = ({ color }) => ({
    borderColor: color,
    fill: true,
    borderWidth: 3,
    pointRadius: 3,
    pointHitRadius: 10,
  })

  const axesStyles = ({ color, lineHeight }) => ({
    borderCapStyle: 'round',
    gridLines: { display: false },
    ticks: {
      fontFamily: 'Kanit, sans-serif',
      fontColor: color,
      fontSize: 14,
      lineHeight,
      maxRotation: 0,
      beginAtZero: true,
      autoSkipPadding: 15,
      userCallback: (value) => value.toLocaleString(),
    },
  })

  return (
    <>
      {historyError && (
        <InnerWrapper>
          <Text>Error fetching data</Text>
        </InnerWrapper>
      )}
      {!historyError && historyData.length > 1 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LegendItem>
            <Circle isPoolSize />
            <Text>Pool Size</Text>
          </LegendItem>
          <Line
            data={{
              labels: getDataArray('lotteryNumber'),
              datasets: [
                {
                  label: 'Pool Size',
                  data: getDataArray('poolSize'),
                  yAxisID: 'y-axis-pool',
                  ...lineStyles({ color: '#6d6d6d' }),
                },
              ],
            }}
            options={{
              legend: { display: false },
              scales: {
                yAxes: [
                  {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-pool',
                    ...axesStyles({ color: '#6d6d6d', lineHeight: 1.6 }),
                  },
                ],
                xAxes: [
                  {
                    ...axesStyles({ color: '#6d6d6d', lineHeight: 1 }),
                  },
                ],
              },
            }}
            type="line"
          />

          <LegendItem>
            <Circle />
            <Text>Burned</Text>
          </LegendItem>
          <Line
            data={{
              labels: getDataArray('lotteryNumber'),
              datasets: [
                {
                  label: 'Burned',
                  data: getDataArray('burned'),
                  yAxisID: 'y-axis-burned',
                  ...lineStyles({ color: '#b0bec5' }),
                },
              ],
            }}
            options={{
              legend: { display: false },
              scales: {
                yAxes: [
                  {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-burned',
                    ...axesStyles({ color: '#b0bec5', lineHeight: 1.5 }),
                  },
                ],
                xAxes: [
                  {
                    ...axesStyles({ color: '#b0bec5', lineHeight: 1 }),
                  },
                ],
              },
            }}
            type="line"
          />
        </Suspense>
      ) : (
        <InnerWrapper>
          <Loading />
        </InnerWrapper>
      )}
    </>
  )
}

export default HistoryChart
