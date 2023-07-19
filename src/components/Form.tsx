import dayjs from 'dayjs'
import styled from 'styled-components'
import Input from './Input'
import { device } from '../styles/variables'
import SubmitButton from './SubmitButton'

const Container = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 3.9375rem;
  border-bottom: 2px solid var(--line-color);
  column-gap: 1rem;

  @media ${device.desktop} {
    justify-content: flex-start;
    gap: 2rem;
    padding-bottom: 32px;
  }
`

function Form() {
  return (
    <Container>
      <Input label="day" placeholder="DD" max={31} />
      <Input label="month" placeholder="MM" max={12} />
      <Input label="year" placeholder="YYYY" min={100} max={dayjs().year()} />
      <SubmitButton />
    </Container>
  )
}

export default Form
