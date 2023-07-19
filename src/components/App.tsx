import styled from 'styled-components'
import Form from './Form'
import Results from './Results'
import { device } from '../styles/variables'

const Container = styled.main`
  margin-top: 5.5rem;
  background: var(--container-background);
  padding: 3rem 1.5rem 2.25rem 1.5rem;
  border-radius: 1.25rem 1.25rem 6rem 1.25rem;

  @media ${device.desktop} {
    min-width: 52.5rem;
    margin-top: 0;
    padding: 3.5rem 6.5rem 3rem 3.5rem;
    border-radius: 1.5rem 1.5rem 12rem 1.5rem;
  }
`

function App() {
  return (
    <Container>
      <Form />
      <Results />
    </Container>
  )
}

export default App
