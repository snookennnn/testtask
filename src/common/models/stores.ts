export type GenderRecalculation = {
  male: number
  female: number
  others: number
}

export type Gender = keyof GenderRecalculation
