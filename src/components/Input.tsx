import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { AgeContextType } from '../types/types'
import { AgeContext } from '../context/AgeProvider'
import { device } from '../styles/variables'

const Label = styled.label<{ error: boolean }>`
  font-size: 0.75rem;
  letter-spacing: 0.125rem;
  color: var(--label-color);

  ${({ error }) =>
    error &&
    css`
      color: var(--error-color);
    `}

  @media ${device.desktop} {
    font-size: 0.9375rem;
    letter-spacing: 0.1875rem;
  }
`

const Ipt = styled.input<{ error: boolean }>`
  width: 5.5rem;
  height: 3.375rem;
  padding: 1rem;
  font-size: 1.25rem;
  border-radius: 10px;
  border: 1px solid var(--input-border-color);
  margin: 0.25rem 0;

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

  @media ${device.desktop} {
    width: 9.875rem;
    height: 70px;
    padding: 1.5rem;
    margin: 0.625rem 0 0.5rem 0;
    font-size: 2rem;
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

const Error = styled.p`
  font-style: italic;
  font-size: 0.625rem;
  letter-spacing: initial;

  @media ${device.desktop} {
    font-size: 0.875rem;
  }
`

function Input({ label, placeholder, min, max }: Props) {
  const { birthday, setBirthday } = useContext(AgeContext) as AgeContextType
  const hasError = birthday[label].error !== null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.length > 4) return
    if (label !== 'year' && value.length > 2) return

    setBirthday((prev) => ({ ...prev, [label]: { ...prev[label], value } }))
  }

  const filterDisallowedKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const disallowedKey = ['e', 'E', '-', ',', '+', '.']

    if (disallowedKey.includes(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <Label htmlFor={label} error={hasError}>
      {label.toUpperCase()}
      <Ipt
        min={min}
        max={max}
        type="number"
        id={label}
        onChange={handleChange}
        onKeyDown={filterDisallowedKey}
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
  min?: number | undefined
  max?: number | undefined
}

Input.defaultProps = {
  min: 1,
  max: undefined,
}
