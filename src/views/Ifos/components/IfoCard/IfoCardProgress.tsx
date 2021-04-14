import React from 'react'
import styled from 'styled-components'
import { Progress } from '@shrimpswap/uikit'

interface IfoCardProgressProps {
  progress: number
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
`

const IfoCardProgress: React.FC<IfoCardProgressProps> = ({ progress }) => (
  <StyledProgress>
    <Progress primaryStep={progress} />
  </StyledProgress>
)

export default IfoCardProgress
