export type Birthday = {
  day: string
  month: string
  year: string
}

export type Age = {
  days: number | null
  months: number | null
  years: number | null
}

export type AgeContextType = {
  birthday: Birthday
  setBirthday: React.Dispatch<React.SetStateAction<Birthday>>
  age: Age
  ageCalculator: () => void
}
