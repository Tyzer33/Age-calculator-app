import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { Birthday, Age, AgeContextType } from '../types/types'

export const AgeContext = createContext<AgeContextType | null>(null)

function AgeProvider({ children }: Props) {
  const [birthday, setBirthday] = useState<Birthday>({
    day: '',
    month: '',
    year: '',
  })

  const [age, setAge] = useState<Age>({
    days: null,
    months: null,
    years: null,
  })

  function checkValidity(dateOfBirth: Birthday) {
    // TODO: Vérifier la validité de la date de naissance
    const { day, month, year } = dateOfBirth

    const date = new Date()

    if (Number(year) > date.getFullYear()) return

    console.log('pass')
  }

  const ageCalculator = useCallback(() => {
    const { day, month, year } = birthday

    checkValidity(birthday)

    // TODO: Faire le calcul de l'age
    setAge({
      days: Number(day) * 2,
      months: Number(month) * 2,
      years: Number(year) * 2,
    })
  }, [birthday])

  // function ageCalculator() {
  //   const { day, month, year } = birthday
  //   setAge({
  //     days: Number(day) * 2,
  //     months: Number(month) * 2,
  //     years: Number(year) * 2,
  //   })
  // }

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
