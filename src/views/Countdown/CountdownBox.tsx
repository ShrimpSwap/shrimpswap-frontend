import React, { FC } from 'react'
import styled from 'styled-components'

interface CountdownBoxProps {
  left: number | string
  divideBy: number
  label: string
}

const CountdownBox: FC<CountdownBoxProps> = ({ left, divideBy, label }) => (
  <Wrapper>
    <BoxCircles>
      <svg height="110" width="110">
        <circle stroke="#b0bec5" strokeWidth="9" r="47" cx="55" cy="55" />
        <circle
          stroke="#6d6d6d"
          strokeDashoffset={-((+left / divideBy) * 47 * 2 * Math.PI) + 47 * 2 * Math.PI}
          strokeDasharray={47 * 2 * Math.PI}
          strokeWidth="3"
          r="47"
          cx="55"
          cy="55"
        />
      </svg>
      <BoxLeft>{left}</BoxLeft>
    </BoxCircles>
    <BoxLabel>{label}</BoxLabel>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  svg {
    position: relative;

    circle {
      transform: rotate(-90deg);
      transform-origin: center;
      fill: transparent;
    }
  }

  &_circles {
    position: relative;
  }

  &_left {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    font-size: 20px;
  }

  &_label {
    font-size: 14px;
    font-weight: 300;
    text-align: center;
  }
`

const BoxCircles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;

  svg {
    position: relative;

    circle {
      transform: rotate(-90deg);
      transform-origin: center;
      fill: transparent;
    }
  }
`

const BoxLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#000000')};

  svg {
    position: relative;

    circle {
      transform: rotate(-90deg);
      transform-origin: center;
      fill: transparent;
    }
  }
`
const BoxLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#000000')};

  svg {
    position: relative;

    circle {
      transform: rotate(-90deg);
      transform-origin: center;
      fill: transparent;
    }
  }
`

export default CountdownBox
