export type BirthdayMember = {
  value: string
  error: string | null
}

export type Birthday = {
  day: BirthdayMember
  month: BirthdayMember
  year: BirthdayMember
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
