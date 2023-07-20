import { useContext } from 'react'
import styled from 'styled-components'
import { AgeContextType } from '../types/types'
import { AgeContext } from '../context/AgeProvider'
import { device } from '../styles/variables'
import ArrowIcon from './ArrowIcon'

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

  @media ${device.desktop} {
    left: 100%;
    height: 6rem;
  }
`

function SubmitButton() {
  const { handleSubmit } = useContext(AgeContext) as AgeContextType

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleSubmit()
  }
  return (
    <Button type="submit" onClick={handleClick}>
      <ArrowIcon />
    </Button>
  )
}

export default SubmitButton
