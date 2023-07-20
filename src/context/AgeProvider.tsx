import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import preciseDiff from 'dayjs-precise-range'
import duration from 'dayjs/plugin/duration'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Birth, Age, AgeContextType, DateError } from '../types/types'

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(preciseDiff)

export const AgeContext = createContext<AgeContextType | null>(null)

function AgeProvider({ children }: Props) {
  const [birth, setBirth] = useState<Birth>({ day: '', month: '', year: '' })
  const [error, setError] = useState<DateError>({ day: null, month: null, year: null })
  const [age, setAge] = useState<Age>({ days: null, months: null, years: null })

  const setBirthTo = useCallback(
    (to: keyof Birth, value: string) => setBirth((prev) => ({ ...prev, [to]: value })),
    []
  )

  function setErrorTo(to: keyof Birth, value: string) {
    setError((prev) => ({ ...prev, [to]: value }))
  }

  const completeYear = birth.year.padStart(4, '0')
  const inputedDate = dayjs(`${completeYear}-${birth.month}-${birth.day}`, 'YYYY-MM-DD', true)

  const handleSubmit = useCallback(() => {
    // Reset Error and Result
    setError({ day: null, month: null, year: null })
    setAge({ days: null, months: null, years: null })

    function checkKeyValidity(key: keyof Birth) {
      const max = { day: 31, month: 12, year: dayjs().year() }
      const value = birth[key]

      if (value === null) {
        setErrorTo(key, 'This field is required')
        return false
      }
      if (Number(value) > max[key]) {
        const errorValue = key === 'year' ? 'Must be in the past' : `Must be a valid ${key}`
        setErrorTo(key, errorValue)
        return false
      }
      return true
    }

    const keysOfBirth = Object.keys(birth) as (keyof Birth)[]

    if (keysOfBirth.every(checkKeyValidity) === false) return

    if (!inputedDate.isValid()) {
      setError({ day: 'Must be a valid date', month: '', year: '' })
      return
    }

    if (inputedDate.isAfter(dayjs())) {
      setError({ day: 'Must be in the past', month: '', year: '' })
      return
    }

    const { days, months, years } = dayjs.preciseDiff(dayjs(), inputedDate, true)

    setAge({ days, months, years })
  }, [birth, inputedDate])

  const value = useMemo(
    () => ({ birth, setBirthTo, error, age, handleSubmit }),
    [birth, setBirthTo, error, age, handleSubmit]
  )

  return <AgeContext.Provider value={value}>{children}</AgeContext.Provider>
}

type Props = {
  children: ReactNode
}

export default AgeProvider
