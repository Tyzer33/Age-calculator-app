import styled from 'styled-components'
import { device } from '../styles/variables'

const Div = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 3rem;

  @media ${device.desktop} {
    font-size: 2.5rem;
    margin-top: 0;
  }
`

const P = styled.p`
  max-width: max-content;
`

function Error() {
  return (
    <Div>
      🚨
      <P> Sorry, an error occured! </P>
      🚨
    </Div>
  )
}

export default Error
