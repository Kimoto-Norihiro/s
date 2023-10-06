export type Author = {
  id: number
  ja_first_name: string
  ja_last_name: string
  en_first_name: string
  en_last_name: string
}
export type Authors = Author[]

// type for table display
export type AuthorTableDisplay = {
  id: number
	ja_name: string
	en_name: string
}
export type AuthorTableDisplays = AuthorTableDisplay[]

export function authorsToTableDisplays(authors: Authors): AuthorTableDisplays {
  return authors.map((author) => {
    return {
      id: author.id,
      ja_name: `${author.ja_last_name} ${author.ja_first_name}`,
      en_name: `${author.en_first_name} ${author.en_last_name}`
    }
  })
}

// type for form
export const authorsToOptions = (list: Authors) => {
	return list.map((author) => {
		return {
			value: author.id,
			label: `${author.ja_first_name} ${author.ja_last_name}`
		}
	})
}
