import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import moment from 'moment'
import 'moment-precise-range-plugin'
import { Birthday, Age, AgeContextType } from '../types/types'

export const AgeContext = createContext<AgeContextType | null>(null)

function AgeProvider({ children }: Props) {
  // TODO: créer une fonction pour remplacer setBirthday
  const [birthday, setBirthday] = useState<Birthday>({
    day: {
      value: '27',
      error: null,
    },
    month: {
      value: '08',
      error: null,
    },
    year: {
      value: '1999',
      error: null,
    },
  })

  const [age, setAge] = useState<Age>({
    days: null,
    months: null,
    years: null,
  })

  const { day, month, year } = birthday
  const inputedDate = moment(`${day.value}/${month.value}/${year.value}`, 'DD/MM/YYYY')
  const actualDate = moment()

  const checkValidity = useCallback(
    (dateOfBirth: Birthday) => {
      // TODO: simplifier grace à Moment

      const actualYear = actualDate.year()
      let isValid = true

      // TODO: simplifier la vérification de 'day' 'month' et 'year'
      Object.keys(dateOfBirth).forEach((time) => {
        if (!(time === 'day' || time === 'month' || time === 'year')) return
        const max = { day: 31, month: 12, year: actualYear }
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
      } else if (inputedDate.isAfter(actualDate)) {
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
    [inputedDate, actualDate]
  )

  // TODO: changer le nom de 'ageCalculator'
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

    const diff = actualDate.diff(inputedDate)
    const ageDuration = moment.duration(diff)

    // TODO: vérifier pourquoi 01/01/00 ne me donne pas la date actuel
    // essayer avec hasDays()
    const m1 = moment('2014-01-01 12:00:00', 'YYYY-MM-DD HH:mm:ss')
    const m2 = moment('2014-02-03 15:04:05', 'YYYY-MM-DD HH:mm:ss')
    const diffe = moment.preciseDiff(m1, m2, true) // '1 month 2 days 3 hours 4 minutes 5 seconds'
    console.log(diffe)

    setAge({
      days: ageDuration.days(),
      months: ageDuration.months(),
      years: ageDuration.years(),
    })
  }, [birthday, checkValidity, actualDate, inputedDate])

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
