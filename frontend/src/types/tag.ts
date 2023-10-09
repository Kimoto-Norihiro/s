export type Tag = {
  id: number
  name: string
}
export type Tags = Tag[]
export type TagTableDisplay = Tag
export type TagTableDisplays = TagTableDisplay[]

export function tagsToTableDisplays(tags: Tags): TagTableDisplays {
  return tags.map((tag) => {
    return {
      id: tag.id,
      name: tag.name,
    }
  })
}

export const tagsToOptions = (list: Tags) => {
	return list.map((tag) => {
		return {
			value: tag.id,
			label: tag.name
		}
	})
}