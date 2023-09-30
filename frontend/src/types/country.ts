import { type } from "os"

export type Country = {
  id: number
  name: string
}
export type Countries = Country[]
export type CountryTableDisplay = Omit<Country, 'id'>
export type CountryTableDisplays = CountryTableDisplay[]

// type for form
export type CountryUpsertValues = Omit<Country, 'id'>

// type for table display
export function countriesToTableDisplays(countries: Countries): CountryTableDisplays {
  return countries.map((tag) => {
    return {
      name: tag.name,
    }
  })
}

export const countriesToOptions = (list: Countries) => {
	return list.map((country) => {
		return {
			value: country.id,
			label: country.name
		}
	})
}