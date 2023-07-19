import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { AgeContext } from '../context/AgeProvider'
import { AgeContextType } from '../types/types'
import { device } from '../styles/variables'

const Container = styled.div`
  margin-top: 4rem;
  font-size: 3rem;
  font-weight: 800;
  font-style: italic;
  line-height: 3.5rem;

  @media ${device.desktop} {
    margin-top: 4rem;
    font-size: 6.25rem;
    line-height: 7rem;
  }
`

type SpanProps = {
  isPlaceholder: boolean
}

const Span = styled.span<SpanProps>`
  color: var(--accent-color);

  @media ${device.desktop} {
    ${({ isPlaceholder }) =>
      isPlaceholder &&
      css`
        letter-spacing: 1rem;
        margin-right: -1.625rem;
      `}
  }
`

function Results() {
  const { age } = useContext(AgeContext) as AgeContextType
  const { days, months, years } = age

  return (
    <Container>
      <div>
        <Span isPlaceholder={years === null}>{years === null ? '--' : years}</Span> years
      </div>
      <div>
        <Span isPlaceholder={months === null}>{months === null ? '--' : months}</Span> months
      </div>
      <div>
        <Span isPlaceholder={days === null}>{days === null ? '--' : days}</Span> days
      </div>
    </Container>
  )
}

export default Results
