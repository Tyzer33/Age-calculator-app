import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import preciseDiff from 'dayjs-precise-range'
import duration from 'dayjs/plugin/duration'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Birthday, Age, AgeContextType } from '../types/types'

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(preciseDiff)

export const AgeContext = createContext<AgeContextType | null>(null)

function AgeProvider({ children }: Props) {
  const [birthday, setBirthday] = useState<Birthday>({
    day: {
      value: '',
      error: null,
    },
    month: {
      value: '',
      error: null,
    },
    year: {
      value: '',
      error: null,
    },
  })

  const [age, setAge] = useState<Age>({
    days: null,
    months: null,
    years: null,
  })

  const {
    day: { value: dayValue },
    month: { value: monthValue },
    year: { value: yearValue },
  } = birthday
  const completeYear = yearValue.padStart(4, '0')
  const inputedDate = dayjs(`${completeYear}-${monthValue}-${dayValue}`, 'YYYY-MM-DD', true)

  const checkValidity = useCallback(
    (dateOfBirth: Birthday) => {
      let isValid = true

      Object.keys(dateOfBirth).forEach((time) => {
        if (!(time === 'day' || time === 'month' || time === 'year')) return
        const max = { day: 31, month: 12, year: dayjs().year() }
        const { value } = dateOfBirth[time]

        if (value === '') {
          setBirthday((prev) => ({
            ...prev,
            [time]: {
              ...prev[time],
              error: 'This field is required',
            },
          }))
          isValid = false
        } else if (Number(value) > max[time]) {
          setBirthday((prev) => ({
            ...prev,
            [time]: {
              ...prev[time],
              error: time === 'year' ? 'Must be in the past' : `Must be a valid ${time}`,
            },
          }))
          isValid = false
        }
      })

      if (!isValid) return isValid
      if (!inputedDate.isValid()) {
        setBirthday((prev) => ({
          ...prev,
          day: {
            ...prev.day,
            error: 'Must be a valid date',
          },
          month: {
            ...prev.month,
            error: '',
          },
          year: {
            ...prev.year,
            error: '',
          },
        }))
        isValid = false
      } else if (inputedDate.isAfter(dayjs())) {
        setBirthday((prev) => ({
          ...prev,
          day: {
            ...prev.day,
            error: 'Must be in the past',
          },
          month: {
            ...prev.month,
            error: '',
          },
          year: {
            ...prev.year,
            error: '',
          },
        }))
        isValid = false
      }

      return isValid
    },
    [inputedDate]
  )

  const ageCalculator = useCallback(() => {
    // Reset Error and Result
    setBirthday((prev) => ({
      ...prev,
      day: {
        ...prev.day,
        error: null,
      },
      month: {
        ...prev.month,
        error: null,
      },
      year: {
        ...prev.year,
        error: null,
      },
    }))

    setAge({
      days: null,
      months: null,
      years: null,
    })

    if (!checkValidity(birthday)) return

    const { days, months, years } = dayjs.preciseDiff(dayjs(), inputedDate, true)

    setAge({
      days,
      months,
      years,
    })
  }, [birthday, checkValidity, inputedDate])

  const value = useMemo(
    () => ({ birthday, setBirthday, age, ageCalculator }),
    [birthday, setBirthday, age, ageCalculator]
  )

  return <AgeContext.Provider value={value}>{children}</AgeContext.Provider>
}

type Props = {
  children: ReactNode
}

export default AgeProvider
