export type Tag = {
  id: number
  name: string
}
export type Tags = Tag[]
export type TagTableDisplay = Omit<Tag, 'id'>
export type TagTableDisplays = TagTableDisplay[]

export function tagsToTableDisplays(tags: Tags): TagTableDisplays {
  return tags.map((tag) => {
    return {
      name: tag.name,
    }
  })
}