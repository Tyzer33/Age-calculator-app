import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { AgeContextType } from '../types/types'
import { AgeContext } from '../context/AgeProvider'

const Label = styled.label<{ error: boolean }>`
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: var(--label-color);

  ${({ error }) =>
    error &&
    css`
      color: var(--error-color);
    `}
`

const Ipt = styled.input<{ error: boolean }>`
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

  ${({ error }) =>
    error &&
    css`
      border-color: var(--error-color);

      &:focus {
        border-color: var(--error-color);
        caret-color: var(--error-color);
      }
    `}
`

// TODO: styliser Error après avoir fait le style en 1440p
const Error = styled.p`
  font-weight: 400;
`

function Input({ label, placeholder, max }: Props) {
  const { birthday, setBirthday } = useContext(AgeContext) as AgeContextType
  const hasError = birthday[label].error !== null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    if (value.length > 4) return
    if (label !== 'year' && value.length > 2) return

    setBirthday((prev) => ({ ...prev, [label]: { ...prev[label], value } }))
  }

  function filterDisallowedKey(e: React.KeyboardEvent<HTMLInputElement>) {
    const disallowedKey = ['e', 'E', '-', ',', '+', '.']

    if (disallowedKey.includes(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <Label htmlFor={label} error={hasError}>
      {label.toUpperCase()}
      <Ipt
        min={1}
        max={max}
        type="number"
        id={label}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => filterDisallowedKey(e)}
        value={birthday[label].value}
        placeholder={placeholder}
        error={hasError}
      />
      <Error>{birthday[label].error}</Error>
    </Label>
  )
}

export default Input

type Props = {
  label: 'day' | 'month' | 'year'
  placeholder: 'DD' | 'MM' | 'YYYY'
  max?: number | undefined
}

Input.defaultProps = {
  max: undefined,
}
