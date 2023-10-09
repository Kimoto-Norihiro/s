export type Publisher = {
  id: number
  name: string
  short_name: string
}
export type Publishers = Publisher[]

// type for table display
export type PublisherTableDisplay = Publisher
export type PublisherTableDisplays = PublisherTableDisplay[]

export function publishersToTableDisplays(publishers: Publishers): PublisherTableDisplays {
  return publishers.map((publisher) => {
    return {
      id: publisher.id,
      name: publisher.name,
      short_name: publisher.short_name
    }
  })
}