import { Publisher } from "./publisher"

export type JournalInfo = {
  id: number
  name: string
  short_name: string
  iso4_name: string
  publisher: Publisher
}
export type JournalInfos = JournalInfo[]

export type JournalInfoUpsertValues = Omit<JournalInfo, 'id'>