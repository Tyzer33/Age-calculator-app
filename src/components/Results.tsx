import { useContext } from 'react'
import styled from 'styled-components'
import { AgeContext } from '../context/AgeProvider'
import { AgeContextType } from '../types/types'

const Container = styled.div`
  margin-top: 4rem;
  font-size: 3rem;
  font-weight: 800;
  font-style: italic;
  line-height: 3.5rem;
`

const Span = styled.span`
  color: var(--accent-color);
`

function Results() {
  const { age } = useContext(AgeContext) as AgeContextType
  const { days, months, years } = age

  return (
    <Container>
      <div>
        <Span>{years || '--'}</Span> years
      </div>
      <div>
        <Span>{months || '--'}</Span> months
      </div>
      <div>
        <Span>{days || '--'}</Span> days
      </div>
    </Container>
  )
}

export default Results
