import { useContext } from 'react'
import styled from 'styled-components'
import { AgeContextType } from '../types/types'
import { AgeContext } from '../context/AgeProvider'
import Input from './Input'
import arrow from '../assets/icon-arrow.svg'

const Container = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 3.9375rem;
  border-bottom: 2px solid var(--line-color);
  column-gap: 1rem;
`

const Button = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  bottom: 0;
  translate: -50% 50%;
  height: 4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--accent-color);

  &:hover,
  &:focus-visible {
    background: var(--button-background-hover);
  }
`

const Image = styled.img`
  height: 1.5rem;
  width: 1.75rem;
`

function Form() {
  const { ageCalculator } = useContext(AgeContext) as AgeContextType

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    ageCalculator()
  }
  return (
    <Container>
      <Input label="day" placeholder="DD" />
      <Input label="month" placeholder="MM" />
      <Input label="year" placeholder="YYYY" />
      <Button type="submit" onClick={(e) => handleClick(e)}>
        <Image src={arrow} alt="arrow" />
      </Button>
    </Container>
  )
}

export default Form
