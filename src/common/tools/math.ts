export const ROMAN_NUMERALS: Record<string, number> = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
}

export const numberToRoman = (number: number): string => {
  if (number <= 0 || number > 3999) {
    throw new Error('Number out of range (1-3999)')
  }

  let romanNumber = ''

  for (const symbol in ROMAN_NUMERALS) {
    const value = ROMAN_NUMERALS[symbol]

    while (number >= value) {
      romanNumber += symbol
      number -= value
    }
  }

  return romanNumber
}
