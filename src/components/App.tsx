import styled from 'styled-components'
import Form from './Form'
import Results from './Results'

const Container = styled.div`
  margin-top: 5.5rem;
  background: var(--container-background);
  padding: 3rem 1.5rem 2.25rem 1.5rem;
  border-radius: 1.25rem 1.25rem 6.25rem 1.25rem;
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
