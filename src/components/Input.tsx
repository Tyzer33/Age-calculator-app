import { useContext } from 'react'
import styled from 'styled-components'
import { AgeContextType } from '../types/types'
import { AgeContext } from '../context/AgeProvider'

const Label = styled.label`
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: var(--label-color);
`

const Ipt = styled.input`
  height: 3.375rem;
  width: 5.5rem;
  padding: 1rem;
  font-size: 1.25rem;
  border-radius: 10px;
  border: 1px solid var(--input-border-color);
  margin-top: 0.25rem;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color);
    caret-color: var(--accent-color);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

function Input({ label, placeholder }: Props) {
  const { birthday, setBirthday } = useContext(AgeContext) as AgeContextType

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    if (value.length > 4) return
    if (label !== 'year' && value.length > 2) return

    setBirthday((prev) => ({ ...prev, [label]: value }))
  }

  function filterDisallowedKey(e: React.KeyboardEvent<HTMLInputElement>) {
    const disallowedKey = ['e', 'E', '-', ',', '+', '.']

    if (disallowedKey.includes(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <Label htmlFor={label}>
      {label.toUpperCase()}
      <Ipt
        type="number"
        id={label}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => filterDisallowedKey(e)}
        value={birthday[label]}
        placeholder={placeholder}
      />
    </Label>
  )
}

export default Input

type Props = {
  label: 'day' | 'month' | 'year'
  placeholder: 'DD' | 'MM' | 'YYYY'
}
