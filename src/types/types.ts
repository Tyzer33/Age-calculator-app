export type Birth = {
  day: string
  month: string
  year: string
}

export type DateError = {
  day: string | null
  month: string | null
  year: string | null
}

export type Age = {
  days: number | null
  months: number | null
  years: number | null
}

export type AgeContextType = {
  birth: Birth
  setBirthTo: (to: keyof Birth, value: string) => void
  error: DateError
  age: Age
  handleSubmit: () => void
}
