import { type } from "os"

export type Country = {
  id: number
  name: string
}
export type Countries = Country[]

// type for form

export const countriesToOptions = (list: Countries) => {
	return list.map((country) => {
		return {
			value: country.id,
			label: country.name
		}
	})
}